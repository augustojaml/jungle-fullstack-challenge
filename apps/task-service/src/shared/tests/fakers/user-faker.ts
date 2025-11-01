import { faker } from '@faker-js/faker'

import { TaskUserRepositoryPort } from '@/modules/task/contracts/task-user-repository.port'
import { TaskUserEntity } from '@/modules/task/entities/task-users-entity'

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
  repo: TaskUserRepositoryPort
}

const userFakeRepo = async ({
  password = '123456',
  repo,
}: UserFakeRepoParams) => {
  const user = await userFaker({ password })
  return repo.create(TaskUserEntity.create(user))
}

export { userFaker, userFakeRepo }
