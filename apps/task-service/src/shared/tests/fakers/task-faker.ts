import { faker } from '@faker-js/faker'
import { TASK_PRIORITY, TASK_STATUS } from '@repo/types'

import { TaskRepositoryPort } from '@/modules/task/contracts/task-repository-port'
import { TaskEntity } from '@/modules/task/entities/task-entity'

type TaskFakePrams = {
  creatorId: string
}

const taskFaker = ({ creatorId }: TaskFakePrams) => {
  return {
    title: faker.lorem.words(), // ok
    description: faker.lorem.paragraph(), // ok
    dueDate: faker.date.future(), // ok
    priority: faker.helpers.arrayElement(Object.values(TASK_PRIORITY)),
    status: faker.helpers.arrayElement(Object.values(TASK_STATUS)),
    creatorId: creatorId,
  }
}

type TaskFakeRepoPrams = {
  creatorId: string
  repo: TaskRepositoryPort
}

const taskFakeRepo = ({ creatorId, repo }: TaskFakeRepoPrams) => {
  const task = taskFaker({ creatorId })
  return repo.create(TaskEntity.create(task))
}

export { taskFaker, taskFakeRepo }
