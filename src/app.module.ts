import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './infrastructure/config/typeorm.config';
import { TaskController } from './infrastructure/controllers/task.controller';
import { UserController } from './infrastructure/controllers/user.controller';
import { TaskOrmEntity } from './infrastructure/persistence/typeorm/task.orm-entity';
import { UserOrmEntity } from './infrastructure/persistence/typeorm/user.orm-entity';
import { CreateTaskUseCase } from './application/task/create-task.usecase';
import { GetTasksByUserUseCase } from './application/task/get-tasks-by-user.usecase';
import { UpdateTaskStatusUseCase } from './application/task/update-task-status.usecase';
import { SoftDeleteTaskUseCase } from './application/task/soft-delete-task.usecase';
import { TaskRepositoryImpl } from './infrastructure/persistence/typeorm/task.repository.impl';
import { CreateUserUseCase } from './application/user/create-user.usecase';
import { GetUserByIdUseCase } from './application/user/get-user.usercase';
import { UserRepositoryImpl } from './infrastructure/persistence/typeorm/user.repository.impl';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([TaskOrmEntity, UserOrmEntity]),
  ],
  controllers: [AppController, TaskController, UserController],
  providers: [
    AppService,
    CreateTaskUseCase,
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetTasksByUserUseCase,
    UpdateTaskStatusUseCase,
    SoftDeleteTaskUseCase,
    {
      provide: 'ITaskRepository',
      useClass: TaskRepositoryImpl,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
})
export class AppModule {}
