import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { CreateTaskUseCase } from '../../application/task/create-task.usecase';
import { GetTasksByUserUseCase } from '../../application/task/get-tasks-by-user.usecase';
import { UpdateTaskStatusUseCase } from '../../application/task/update-task-status.usecase';
import { SoftDeleteTaskUseCase } from '../../application/task/soft-delete-task.usecase';
import { TaskStatus } from '../../domain/task/task.entity';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTasksByUserUseCase: GetTasksByUserUseCase,
    private readonly updateTaskStatusUseCase: UpdateTaskStatusUseCase,
    private readonly softDeleteTaskUseCase: SoftDeleteTaskUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente' })
  async create(@Body() dto: CreateTaskDto) {
    return await this.createTaskUseCase.execute(dto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener tareas por usuario' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiQuery({ name: 'status', required: false, enum: TaskStatus, description: 'Filtrar por estado de tarea' })
  @ApiResponse({ status: 200, description: 'Lista de tareas devuelta correctamente' })
  async getTasksByUser(
    @Param('userId') userId: number,
    @Query('status') status?: TaskStatus,
  ) {
    return await this.getTasksByUserUseCase.execute(userId, status);
  }

  @Patch(':taskId/status')
  @ApiOperation({ summary: 'Actualizar el estado de una tarea' })
  @ApiParam({ name: 'taskId', type: Number, description: 'ID de la tarea' })
  @ApiResponse({ status: 200, description: 'Estado de tarea actualizado correctamente' })
  async updateStatus(
    @Param('taskId') taskId: number,
    @Body('status') status: TaskStatus,
  ) {
    return await this.updateTaskStatusUseCase.execute(taskId, status);
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Eliminar lógicamente una tarea' })
  @ApiParam({ name: 'taskId', type: Number, description: 'ID de la tarea' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada correctamente' })
  async softDelete(@Param('taskId') taskId: number) {
    return await this.softDeleteTaskUseCase.execute(taskId);
  }
}
