import { Injectable, Inject } from '@nestjs/common';
import { ITaskRepository } from '../../domain/task/task.repository';
import { Task, TaskStatus } from '../../domain/task/task.entity';

@Injectable()
export class GetTasksByUserUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(userId: number, status?: TaskStatus): Promise<Task[]> {
    return this.taskRepository.findByUser(userId, status);
  }
}
