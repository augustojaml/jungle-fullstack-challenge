import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { extractBearerToken } from '@repo/utils'

import {
  CreateBodyTaskDto,
  CreateParamTaskDto,
} from '../dtos/create-comment-dto'
import { CreateTaskDto } from '../dtos/create-task-dto'
import { GetTaskDto } from '../dtos/get-task-dto'
import { UpdateTaskDto } from '../dtos/update-task-dto'
import { TaskProxyService } from '../services/task-proxy.service'

@ApiTags('Tasks')
@Controller('/api/tasks')
class ApiGatewayTaskController {
  constructor(private readonly taskProxy: TaskProxyService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create task',
    description: 'Create a new task (private)',
  })
  @ApiResponse({ status: 201, description: 'Task created' })
  @Post('/')
  async create(@Req() req: Request, @Body() dto: CreateTaskDto) {
    const authHeader = req.headers['authorization'] as string | undefined
    const token = extractBearerToken(authHeader)
    return this.taskProxy.create({ dto, accessToken: token ?? '' })
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'List tasks',
    description: 'List tasks with pagination (private)',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Tasks list returned' })
  @Get('/')
  async find(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    const authHeader = req.headers['authorization'] as string | undefined
    const token = extractBearerToken(authHeader)
    return this.taskProxy.find({ token: token ?? '', page, size })
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get task by ID',
    description: 'Get a task details (private)',
  })
  @ApiParam({ name: 'taskId', description: 'Task ID (UUIDv4)' })
  @ApiResponse({ status: 200, description: 'Task returned' })
  @Get('/:taskId')
  async getById(@Req() req: Request, @Param() params: GetTaskDto) {
    const authHeader = req.headers['authorization'] as string | undefined
    const token = extractBearerToken(authHeader)
    return this.taskProxy.getById({ token: token ?? '', params })
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update task',
    description: 'Update a task by ID (private)',
  })
  @ApiParam({ name: 'taskId', description: 'Task ID (UUIDv4)' })
  @ApiResponse({ status: 200, description: 'Task updated' })
  @Put(':taskId')
  async update(
    @Req() req: Request,
    @Param('taskId', new ParseUUIDPipe({ version: '4' })) taskId: string,
    @Body() payload: UpdateTaskDto,
  ) {
    const authHeader = req.headers['authorization'] as string | undefined
    const token = extractBearerToken(authHeader)

    return this.taskProxy.update({
      token: token ?? '',
      taskId: taskId,
      payload,
    })
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete task',
    description: 'Delete a task by ID (private)',
  })
  @ApiParam({ name: 'taskId', description: 'Task ID (UUIDv4)' })
  @ApiResponse({ status: 200, description: 'Task deleted' })
  @Delete(':taskId')
  async delete(
    @Req() req: Request,
    @Param('taskId', new ParseUUIDPipe({ version: '4' })) taskId: string,
  ) {
    const authHeader = req.headers['authorization'] as string | undefined
    const token = extractBearerToken(authHeader)

    return this.taskProxy.delete({
      token: token ?? '',
      taskId: taskId,
    })
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create task comment',
    description: 'Create a comment on a task (private)',
  })
  @ApiParam({ name: 'taskId', description: 'Task ID (UUIDv4)' })
  @ApiResponse({ status: 201, description: 'Comment created' })
  @Post(':taskId/comments')
  async createTaskComments(
    @Req() req: Request,
    @Param() params: CreateParamTaskDto,
    @Body() payload: CreateBodyTaskDto,
  ) {
    const authHeader = req.headers['authorization'] as string | undefined
    const token = extractBearerToken(authHeader)
    return this.taskProxy.createTaskComments({
      token: token ?? '',
      taskId: params.taskId,
      payload: payload.content,
    })
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'List task comments',
    description: 'List comments for a task (private)',
  })
  @ApiParam({ name: 'taskId', description: 'Task ID (UUIDv4)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'size', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Comments list returned' })
  @Get(':taskId/comments')
  async gettaskComments(
    @Req() req: Request,
    @Param('taskId') taskId: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    const authHeader = req.headers['authorization'] as string | undefined
    const token = extractBearerToken(authHeader)

    return this.taskProxy.getTaskComments({
      token: token ?? '',
      taskId: taskId,
      page,
      size,
    })
  }
}

export { ApiGatewayTaskController }
