import { Injectable, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import { ITaskRepository } from '../../domain/task/task.repository';
import { IUserRepository } from '../../domain/user/user.repository';
import { CreateTaskDto } from '../../infrastructure/dtos/create-task.dto';
import { Task } from '../../domain/task/task.entity';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateTaskDto): Promise<Task> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.userId} not found`);
    }

    try {
      const task = new Task({
        title: dto.title,
        description: dto.description,
        status: dto.status,
        dueDate: dto.dueDate,
        userId: dto.userId,
      });
  
      return this.taskRepository.create(task);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    
  }
}
