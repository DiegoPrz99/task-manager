import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITaskRepository } from '../../../domain/task/task.repository';
import { TaskOrmEntity } from './task.orm-entity';
import { Task, TaskStatus} from '../../../domain/task/task.entity';

@Injectable()
export class TaskRepositoryImpl implements ITaskRepository {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly repo: Repository<TaskOrmEntity>,
  ) {}

  async create(task: Task): Promise<Task> {
    const entity = this.repo.create(task);
    return await this.repo.save(entity);
  }

  async findByUser(userId: number, status?: TaskStatus): Promise<Task[]> {
    const query = this.repo.createQueryBuilder('task')
      .where('task.userId = :userId', { userId })
      .andWhere('task.deleted = false');

    if (status) query.andWhere('task.status = :status', { status });

    return await query.getMany();
  }

  async updateStatus(taskId: number, status: TaskStatus): Promise<Task | null> {
    const task = await this.repo.findOneBy({ id: taskId });
    if (!task) return null;
    task.status = status;
    return await this.repo.save(task);
  }

  async softDelete(taskId: number): Promise<void> {
    await this.repo.update(taskId, { deleted: true });
  }
}
