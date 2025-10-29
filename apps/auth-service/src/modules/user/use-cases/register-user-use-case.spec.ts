import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '@/shared/tests/in-memory/in-memory-user-repository'

import { RegisterUseCase } from './register-user-use-case'

let userRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('GenericTest', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('should be defined', async () => {
    const fakeUser = {
      name: 'John Doe',
      email: 'johndoe@me.com',
      password: '123456',
    }

    const result = await sut.execute(fakeUser)
    console.log(result)
    expect(true).toBeTruthy()
  })
})
