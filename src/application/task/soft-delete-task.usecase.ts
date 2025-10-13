import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from '../../domain/task/task.repository';

@Injectable()
export class SoftDeleteTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(taskId: number): Promise<void> {
    await this.taskRepository.softDelete(taskId);
  }
}
