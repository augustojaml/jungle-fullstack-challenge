import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '@/shared/tests/in-memory/in-memory-use-repository'

import { RegisterUserUseCase } from './register-user-use-case'

let userRepository: InMemoryUserRepository
let sut: RegisterUserUseCase

describe('GenericTest', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new RegisterUserUseCase(userRepository)
  })

  it('should be able to register user', async () => {
    const user = {
      name: 'John Doe',
      email: 'Bx5w0@example.com',
      password: '123456',
    }

    const result = await sut.execute({
      name: user.name,
      email: user.email,
      password: user.password,
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

  it('should not be able to register user with same email', async () => {
    const user = {
      name: 'John Doe',
      email: 'Bx5w0@example.com',
      password: '123456',
    }

    await sut.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    await expect(() =>
      sut.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    ).rejects.toThrow(new Error('User already exists'))
  })
})
