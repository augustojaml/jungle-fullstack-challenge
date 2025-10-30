import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UnauthorizedError } from '@/shared/errors/unauthorized-error'
import { passwdBcrypt } from '@/shared/helpers/passwd-bcrypt'
import { InMemoryUserRepository } from '@/shared/tests/in-memory/in-memory-use-repository'

import { UserEntity } from '../entities/user'
import { LoginUserUseCase } from './login-user-use-case'

let userRepository: InMemoryUserRepository
let sut: LoginUserUseCase

describe('Login User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new LoginUserUseCase(userRepository)
  })

  it('should be able to login user', async () => {
    const user = {
      name: 'John Doe',
      email: 'Bx5w0@example.com',
      password: await passwdBcrypt.hash('123456'),
    }

    await userRepository.create(UserEntity.create(user))

    const result = await sut.execute({
      email: user.email,
      password: '123456',
    })
    expect(result).toMatchObject({
      user: {
        id: expect.any(String),
        name: user.name,
        email: user.email,
        avatarUrl: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    })
  })

  it('should not be able to login user with inexistent email', async () => {
    await expect(() =>
      sut.execute({
        email: 'invalid-email',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to login user with incorrect password', async () => {
    const user = {
      name: 'John Doe',
      email: 'Bx5w0@example.com',
      password: await passwdBcrypt.hash('123456'),
    }

    await userRepository.create(UserEntity.create(user))

    await expect(() =>
      sut.execute({
        email: user.email,
        password: 'invalid-password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
