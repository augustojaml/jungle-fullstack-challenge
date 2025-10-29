import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { Task } from 'src/@types'

@Injectable()
class TaskProxyService {
  private readonly taskServiceUrl =
    process.env.TASK_SERVICE_URL ?? 'http://localhost:5001'
  private readonly authServiceUrl =
    process.env.AUTH_SERVICE_URL ?? 'http://localhost:5002'

  constructor(private readonly http: HttpService) {}

  async getTasks(): Promise<Task[]> {
    const { data } = await firstValueFrom(
      this.http.get<Task[]>(`${this.taskServiceUrl}/tasks`),
    )
    return data
  }

  async createTask(name: string): Promise<Task> {
    const { data } = await firstValueFrom(
      this.http.post<Task>(`${this.taskServiceUrl}/tasks`, { name }),
    )
    return data
  }

  async authenticateUser(
    username: string,
    password: string,
  ): Promise<{ token: string }> {
    const { data } = await firstValueFrom(
      this.http.post<{ token: string }>(`${this.authServiceUrl}/auth`, {
        username,
        password,
      }),
    )
    return data
  }

  async getUser(): Promise<{
    id: string
    name: string
    email: string
    password: string
  }> {
    const { data } = await firstValueFrom(
      this.http.get<{
        id: string
        name: string
        email: string
        password: string
      }>(`${this.taskServiceUrl}/auth`),
    )
    return data
  }
}

export { TaskProxyService }
