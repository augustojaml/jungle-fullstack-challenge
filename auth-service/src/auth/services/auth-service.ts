import { randomUUID } from 'node:crypto'

import { Injectable } from '@nestjs/common'
import { User, UserCredentials } from 'src/@types'

@Injectable()
class AuthService {
  // REPOSITORY SIMULATION
  private user: User = {
    id: randomUUID(),
    name: 'Jonh Doe',
    email: 'jonh@example.com',
    password: '123456',
  }

  authWithCredentials({ email, password }: UserCredentials): User {
    if (email === this.user.email && password === this.user.password) {
      return this.user
    }
    throw new Error('Invalid credentials')
  }

  getUser(): Omit<User, 'password'> {
    return {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
    }
  }
}

export { AuthService }
