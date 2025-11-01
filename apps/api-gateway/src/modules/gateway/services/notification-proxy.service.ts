import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Injectable()
class NotificationProxyService {
  private readonly notificationServiceUrl =
    process.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:3004'

  constructor(private readonly http: HttpService) {}

  async create() {
    const { data } = await firstValueFrom(
      this.http.post(`${this.notificationServiceUrl}/notifications`, {}),
    )
    return data
  }
}

export { NotificationProxyService }
