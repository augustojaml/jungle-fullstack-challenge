import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { BaseError } from '@repo/types'
import { AxiosError } from 'axios'
import { Response } from 'express'

interface HttpExceptionResponse {
  message: string | string[]
  errorCode?: string
}

interface ErrorResponse {
  statusCode: number
  message: string
  errorCode: string
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const errorResponse = this.buildErrorResponse(exception)

    response.status(errorResponse.statusCode).json(errorResponse)
  }

  private buildErrorResponse(exception: unknown): ErrorResponse {
    if (exception instanceof BaseError) {
      return this.handleBaseError(exception)
    }

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception)
    }

    if (this.isAxiosError(exception)) {
      return this.handleAxiosError(exception)
    }

    return this.handleUnknownError(exception)
  }

  private handleBaseError(error: BaseError): ErrorResponse {
    return {
      statusCode: error.statusCode,
      message: error.message,
      errorCode: error.errorCode,
    }
  }

  private handleHttpException(exception: HttpException): ErrorResponse {
    const status = exception.getStatus()
    const responseBody = exception.getResponse() as HttpExceptionResponse

    const message = Array.isArray(responseBody.message)
      ? responseBody.message.join(', ')
      : responseBody.message

    return {
      statusCode: status,
      message,
      errorCode: responseBody.errorCode || this.getDefaultErrorCode(status),
    }
  }

  private handleAxiosError(error: AxiosError): ErrorResponse {
    // Se o serviço externo retornou uma resposta
    if (error.response) {
      const status = error.response.status
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseData = error.response.data as any

      this.logger.error(`External service error: ${error.message}`, {
        url: error.config?.url,
        method: error.config?.method,
        status,
        data: responseData,
      })

      return {
        statusCode: status,
        message:
          responseData?.message || error.message || 'External service error',
        errorCode: responseData?.errorCode || 'EXTERNAL_SERVICE_ERROR',
      }
    }

    // Se houve erro de rede (timeout, connection refused, etc)
    if (error.request) {
      this.logger.error(`Network error: ${error.message}`, {
        url: error.config?.url,
        method: error.config?.method,
        code: error.code,
      })

      return {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'External service unavailable',
        errorCode: 'SERVICE_UNAVAILABLE',
      }
    }

    // Erro na configuração da requisição
    this.logger.error(`Request setup error: ${error.message}`, error)

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Failed to communicate with external service',
      errorCode: 'REQUEST_SETUP_ERROR',
    }
  }

  private handleUnknownError(exception: unknown): ErrorResponse {
    this.logger.error('Unhandled exception', exception)

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      errorCode: 'INTERNAL_SERVER_ERROR',
    }
  }

  private isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError === true
  }

  private getDefaultErrorCode(status: number): string {
    const errorCodes: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
      [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
      [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
      [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
      [HttpStatus.CONFLICT]: 'CONFLICT',
      [HttpStatus.UNPROCESSABLE_ENTITY]: 'UNPROCESSABLE_ENTITY',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
      [HttpStatus.BAD_GATEWAY]: 'BAD_GATEWAY',
      [HttpStatus.SERVICE_UNAVAILABLE]: 'SERVICE_UNAVAILABLE',
    }

    return errorCodes[status] || 'UNKNOWN_ERROR'
  }
}
