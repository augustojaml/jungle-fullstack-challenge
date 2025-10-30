import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

import { UnauthorizedError } from '@/shared/errors/unauthorized-error'

@Injectable()
class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateToken(request: Request) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedError()
    }

    const token = authHeader.split(' ')[1]

    try {
      return this.jwtService.verify(token)
    } catch (err) {
      console.log(err)
      throw new UnauthorizedError()
    }
  }
}

export { JwtAuthService }
