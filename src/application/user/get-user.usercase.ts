import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }
}
