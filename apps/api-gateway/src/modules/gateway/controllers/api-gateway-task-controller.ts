import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { extractBearerToken } from '@repo/utils'

import { CreateTaskDto } from '../dtos/create-task-dto'
import { GetTaskDto } from '../dtos/get-task-dto'
import { UpdateTaskDto } from '../dtos/update-task-dto'
import { JwtAuthGuard } from '../jwt-auth.guard'
import { TaskProxyService } from '../services/task-proxy.service'

@ApiTags('Tasks')
@Controller('/api/tasks')
class ApiGatewayTaskController {
  constructor(private readonly taskProxy: TaskProxyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(
    @Headers('authorization') authHeader: string,
    @Body() dto: CreateTaskDto,
  ) {
    const token = extractBearerToken(authHeader)
    return this.taskProxy.create({ dto, accessToken: token ?? '' })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async find(
    @Headers('authorization') authHeader: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    const token = extractBearerToken(authHeader)
    return this.taskProxy.find({ token: token ?? '', page, size })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:taskId')
  async getById(
    @Headers('authorization') authHeader: string,
    @Param() params: GetTaskDto,
  ) {
    const token = extractBearerToken(authHeader)
    return this.taskProxy.getById({ token: token ?? '', params })
  }

  @UseGuards(JwtAuthGuard)
  @Put(':taskId')
  async update(
    @Headers('authorization') authHeader: string,
    @Param('taskId', new ParseUUIDPipe({ version: '4' })) taskId: string,
    @Body() payload: UpdateTaskDto,
  ) {
    const token = extractBearerToken(authHeader)
    console.log(token)
    console.log(taskId)
    console.log(payload)
    return this.taskProxy.update({
      token: token ?? '',
      taskId: taskId,
      payload,
    })
  }
}

export { ApiGatewayTaskController }
