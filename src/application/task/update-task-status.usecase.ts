import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ITaskRepository } from '../../domain/task/task.repository';
import { TaskStatus } from '../../domain/task/task.entity';

@Injectable()
export class UpdateTaskStatusUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(taskId: number, status: TaskStatus) {
    const updated = await this.taskRepository.updateStatus(taskId, status);
    if (!updated) throw new NotFoundException(`Task with ID ${taskId} not found`);
    return updated;
  }
}
