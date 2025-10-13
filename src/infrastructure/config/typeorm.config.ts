import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TaskOrmEntity } from '../persistence/typeorm/task.orm-entity';
import { UserOrmEntity } from '../persistence/typeorm/user.orm-entity';
import * as dotenv from 'dotenv';

dotenv.config();
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [TaskOrmEntity, UserOrmEntity],
  synchronize: true,
};
