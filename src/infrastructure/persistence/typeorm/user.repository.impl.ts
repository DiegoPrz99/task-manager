import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user.entity';
import { UserOrmEntity } from './user.orm-entity';

export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const entity = this.repo.create(user);
    const saved = await this.repo.save(entity);
    return new User({
      id: saved.id,
      email: saved.email,
      name: saved.name,
      createdAt: saved.createdAt,
    });
  }

  async findById(id: number): Promise<User | null> {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) return null;
    return new User({
      id: found.id,
      email: found.email,
      name: found.name,
      createdAt: found.createdAt,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.repo.findOne({ where: { email } });
    if (!found) return null;
    return new User({
      id: found.id,
      email: found.email,
      name: found.name,
      createdAt: found.createdAt,
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.repo.find();
    return users.map(
      (u) =>
        new User({
          id: u.id,
          email: u.email,
          name: u.name,
          createdAt: u.createdAt,
        }),
    );
  }
}
