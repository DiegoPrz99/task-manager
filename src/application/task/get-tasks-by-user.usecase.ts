import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITaskRepository } from '../../domain/task/task.repository';
import { IUserRepository } from '../../domain/user/user.repository';
import { Task, TaskStatus } from '../../domain/task/task.entity';

@Injectable()
export class GetTasksByUserUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: number, status?: TaskStatus): Promise<Task[]> {

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
      return this.taskRepository.findByUser(userId, status);
  }
}
