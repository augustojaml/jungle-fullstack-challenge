import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Injectable()
class TaskProxyService {
  private readonly taskServiceUrl =
    process.env.TASK_SERVICE_URL ?? 'http://localhost:3003'

  constructor(private readonly http: HttpService) {}

  async create() {
    const { data } = await firstValueFrom(
      this.http.post(`${this.taskServiceUrl}/tasks`, {}),
    )
    return data
  }

  async find() {
    console.log(this.taskServiceUrl)
    const { data } = await firstValueFrom(
      this.http.get(`${this.taskServiceUrl}/tasks`, {}),
    )
    return data
  }
}

export { TaskProxyService }
