import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';
import { TaskStatus } from '../../../domain/task/task.entity';

@Entity('tasks')
export class TaskOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column()
  userId: number;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => UserOrmEntity)
  user: UserOrmEntity;
}
