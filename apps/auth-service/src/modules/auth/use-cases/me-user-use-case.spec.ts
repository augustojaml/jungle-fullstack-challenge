import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { InMemoryUserRepository } from '@/shared/tests/in-memory/in-memory-use-repository'

import { UserEntity } from '../entities/user'
import { MeUserUseCase } from './me-user-use-case'

let userRepository: InMemoryUserRepository
let sut: MeUserUseCase

describe('Me User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new MeUserUseCase(userRepository)
  })

  it('should be able to get me user', async () => {
    const user = await userRepository.create(
      UserEntity.create({
        name: 'John Doe',
        email: 'Bx5w0@example.com',
        password: '123456',
      }),
    )

    const result = await sut.execute({ userId: user.id })
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

  it('should not be able to get me user with wrong id', async () => {
    await expect(() =>
      sut.execute({ userId: 'wrong-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
