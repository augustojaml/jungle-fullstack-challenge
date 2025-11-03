import { beforeEach, describe, expect, it } from 'vitest'

import { userFakeRepo } from '@/shared/tests/fakers/user-faker'
import { InMemoryUserRepository } from '@/shared/tests/in-memory/in-memory-use-repository'

import { FindUsersExceptCurrentUseCase } from './find-users-except-current-use-case'

let userRepository: InMemoryUserRepository
let sut: FindUsersExceptCurrentUseCase

describe('Find Except Current Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new FindUsersExceptCurrentUseCase(userRepository)
  })

  it('should be able to find except current users', async () => {
    const loggedUser = await userFakeRepo({ repo: userRepository })

    await userFakeRepo({ repo: userRepository })
    await userFakeRepo({ repo: userRepository })

    const result = await sut.execute({
      loggedUserId: loggedUser.id,
    })
    expect(result.users.length).toBe(2)
  })

  it('should not be able to find except current users with non existing user', async () => {
    await expect(() =>
      sut.execute({
        loggedUserId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
