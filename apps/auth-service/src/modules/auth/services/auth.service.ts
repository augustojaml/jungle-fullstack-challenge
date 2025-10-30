import { Injectable } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken({
    sub,
    expiresIn = '1d',
  }: {
    sub: string
    expiresIn?: JwtSignOptions['expiresIn']
  }) {
    return this.jwtService.sign({ sub }, { expiresIn: expiresIn })
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token)
  }
}
