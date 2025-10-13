import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/user/create-user.usecase';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/user/user.entity';
import { IUserRepository } from '../../domain/user/user.repository';
import { Inject } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = new User({
      email: dto.email,
      name: dto.name,
    });

    return this.createUserUseCase.execute(user);
  }

  @Get()
  async findAll() {
    return this.userRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userRepository.findById(id);
  }
}
