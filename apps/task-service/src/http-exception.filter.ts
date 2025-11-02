import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { BaseError } from '@repo/types'
import { Response } from 'express'
import { EntityNotFoundError, QueryFailedError } from 'typeorm'

interface HttpExceptionResponse {
  message: string | string[]
  errorCode?: string
}

type NormalizedDbError =
  | { kind: 'unique'; message: string }
  | { kind: 'foreign_key'; message: string }
  | { kind: 'not_null' | 'check'; message: string }
  | { kind: 'deadlock' | 'retryable'; message: string }
  | { kind: 'unknown'; message: string; code?: string; detail?: string }

function normalizeTypeOrmError(err: unknown): NormalizedDbError | null {
  if (err instanceof QueryFailedError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const drv: any = (err as any).driverError ?? {}
    const code: string | undefined = drv.code
    const detail: string | undefined = drv.detail
    const message: string =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      drv.message || (err as any).message || 'Database error'

    // Postgres
    if (code === '23505') return { kind: 'unique', message: detail || message }
    if (code === '23503')
      return { kind: 'foreign_key', message: detail || message }
    if (code === '23502')
      return { kind: 'not_null', message: detail || message }
    if (code === '23514') return { kind: 'check', message }
    if (code === '40P01') return { kind: 'deadlock', message }
    if (code === '40001') return { kind: 'retryable', message }

    // MySQL
    if (code === '1062') return { kind: 'unique', message }
    if (code === '1451' || code === '1452')
      return { kind: 'foreign_key', message }
    if (code === '1048') return { kind: 'not_null', message }
    if (code === '3819') return { kind: 'check', message }

    return { kind: 'unknown', message, code, detail }
  }
  return null
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message: string | string[] = 'Internal server error'
    let errorCode = 'INTERNAL_SERVER_ERROR'

    // 1) Erros de domínio
    if (exception instanceof BaseError) {
      status = exception.statusCode
      message = exception.message
      errorCode = exception.errorCode
    }
    // 2) TypeORM: entidade não encontrada (ex.: findOneOrFail)
    else if (exception instanceof EntityNotFoundError) {
      status = HttpStatus.NOT_FOUND
      message = 'Resource not found'
      errorCode = 'ENTITY_NOT_FOUND'
    }
    // 3) TypeORM: erros de constraint/driver
    else {
      const db = normalizeTypeOrmError(exception)
      if (db) {
        switch (db.kind) {
          case 'unique':
            status = HttpStatus.CONFLICT
            message = 'Duplicate value'
            errorCode = 'DB_UNIQUE_VIOLATION'
            break
          case 'foreign_key':
            status = HttpStatus.BAD_REQUEST
            message = 'Invalid reference'
            errorCode = 'DB_FOREIGN_KEY_VIOLATION'
            break
          case 'not_null':
          case 'check':
            status = HttpStatus.BAD_REQUEST
            message = 'Constraint violation'
            errorCode = 'DB_CONSTRAINT_VIOLATION'
            break
          case 'deadlock':
          case 'retryable':
            status = HttpStatus.SERVICE_UNAVAILABLE
            message = 'Please retry the request'
            errorCode = 'DB_RETRYABLE_ERROR'
            break
          default:
            status = HttpStatus.BAD_REQUEST
            message = db.message
            errorCode = 'DB_UNKNOWN_ERROR'
            break
        }
      }
      // 4) Demais HttpExceptions (class-validator, etc.)
      else if (exception instanceof HttpException) {
        status = exception.getStatus()
        const body = exception.getResponse() as HttpExceptionResponse

        message = Array.isArray(body.message)
          ? body.message.join(', ')
          : body.message
        errorCode = body.errorCode || errorCode
      }
      // 5) Fallback: loga e segue 500
      else {
        // cuidado pra não logar dados sensíveis
        console.error(exception)
      }
    }

    res.status(status).json({
      statusCode: status,
      message,
      errorCode,
      timestamp: new Date().toISOString(),
    })
  }
}
