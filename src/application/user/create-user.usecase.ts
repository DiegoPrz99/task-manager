import { IUserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: { email: string; name: string }): Promise<User> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new BadRequestException('Ya existe un usuario con este correo');
    }

    try {
      const user = new User({
        email: data.email,
        name: data.name,
      });

      return await this.userRepository.create(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
