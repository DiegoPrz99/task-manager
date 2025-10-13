import { Task, TaskStatus } from './task.entity';

export abstract class ITaskRepository {
  abstract create(task: Task): Promise<Task>;
  abstract findByUser(userId: number, status?: TaskStatus): Promise<Task[]>;
  abstract updateStatus(taskId: number, status: TaskStatus): Promise<Task | null>;
  abstract softDelete(taskId: number): Promise<void>;
}
