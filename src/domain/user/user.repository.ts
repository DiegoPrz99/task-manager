import { User } from './user.entity';

export abstract class IUserRepository {
  abstract create(user: User): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
}
