import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { CreateTaskUseCase } from '../../application/task/create-task.usecase';
import { GetTasksByUserUseCase } from '../../application/task/get-tasks-by-user.usecase';
import { UpdateTaskStatusUseCase } from '../../application/task/update-task-status.usecase';
import { SoftDeleteTaskUseCase } from '../../application/task/soft-delete-task.usecase';
import { TaskStatus } from '../../domain/task/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTasksByUserUseCase: GetTasksByUserUseCase,
    private readonly updateTaskStatusUseCase: UpdateTaskStatusUseCase,
    private readonly softDeleteTaskUseCase: SoftDeleteTaskUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    return await this.createTaskUseCase.execute(dto);
  }

  @Get('user/:userId')
  async getTasksByUser(
    @Param('userId') userId: number,
    @Query('status') status?: TaskStatus,
  ) {
    return await this.getTasksByUserUseCase.execute(userId, status);
  }

  @Patch(':taskId/status')
  async updateStatus(
    @Param('taskId') taskId: number,
    @Body('status') status: TaskStatus,
  ) {
    return await this.updateTaskStatusUseCase.execute(taskId, status);
  }

  @Delete(':taskId')
  async softDelete(@Param('taskId') taskId: number) {
    return await this.softDeleteTaskUseCase.execute(taskId);
  }
}
