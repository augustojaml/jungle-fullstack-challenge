import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

import { CreateTaskDto } from '../dtos/create-task-dto'
import { GetTaskDto } from '../dtos/get-task-dto'
import { UpdateTaskDto } from '../dtos/update-task-dto'

@Injectable()
class TaskProxyService {
  private readonly taskServiceUrl =
    process.env.TASK_SERVICE_URL ?? 'http://localhost:3003'

  constructor(private readonly http: HttpService) {}

  async create({
    dto,
    accessToken,
  }: {
    dto: CreateTaskDto
    accessToken: string
  }) {
    const { data } = await firstValueFrom(
      this.http.post(`${this.taskServiceUrl}/tasks`, dto, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    )
    return data
  }

  async find({
    token,
    page,
    size,
    title,
  }: {
    token: string
    page: number
    size: number
    title?: string
  }) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.taskServiceUrl}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          size,
          title,
        },
      }),
    )
    return data
  }

  async getById({ token, params }: { token: string; params: GetTaskDto }) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.taskServiceUrl}/tasks/${params.taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    return data
  }

  async update({
    token,
    taskId,
    payload,
  }: {
    token: string
    taskId: string
    payload: UpdateTaskDto
  }) {
    const { data } = await firstValueFrom(
      this.http.put(`${this.taskServiceUrl}/tasks/${taskId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    return data
  }

  async delete({ token, taskId }: { token: string; taskId: string }) {
    const { data } = await firstValueFrom(
      this.http.delete(`${this.taskServiceUrl}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    )
    return data
  }

  async createTaskComments({
    token,
    taskId,
    payload,
  }: {
    token: string
    taskId: string
    payload: string
  }) {
    const { data } = await firstValueFrom(
      this.http.post(
        `${this.taskServiceUrl}/tasks/${taskId}/comments`,
        { content: payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    )
    return data
  }

  async getTaskComments({
    taskId,
    token,
    page,
    size,
  }: {
    taskId: string
    token: string
    page: number
    size: number
  }) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.taskServiceUrl}/tasks/${taskId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          size,
        },
      }),
    )
    return data
  }
}

export { TaskProxyService }
