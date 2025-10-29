import { randomUUID } from 'node:crypto'

import { Injectable } from '@nestjs/common'
import { Task } from 'src/@types'

@Injectable()
class TaskService {
  // REPOSITORY SIMULATION
  private tasks: Task[] = []

  createTask(name: string): Task {
    const newTask: Task = {
      id: randomUUID(),
      name,
      status: 'Pending',
    }
    this.tasks.push(newTask)
    return newTask
  }

  getTasks(): Task[] {
    return this.tasks
  }
}

export { TaskService }
