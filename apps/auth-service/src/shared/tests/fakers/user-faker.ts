import { faker } from '@faker-js/faker'

import { UserRepositoryPort } from '@/modules/auth/contracts/user-repository.port'
import { UserEntity } from '@/modules/auth/entities/user'

type UserFakeParams = {
  password?: string
}

const userFaker = async ({ password = '123456' }: UserFakeParams = {}) => {
  return {
    name: faker.person.firstName() + ' ' + faker.person.lastName(),
    email: faker.internet.email(),
    password: password,
  }
}

type UserFakeRepoParams = {
  password?: string
  repo: UserRepositoryPort
}

const userFakeRepo = async ({
  password = '123456',
  repo,
}: UserFakeRepoParams) => {
  const user = await userFaker({ password })
  return repo.create(UserEntity.create(user))
}

export { userFaker, userFakeRepo }
