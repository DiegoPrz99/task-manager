import { Body, Controller, Get, Param, Post, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../application/user/create-user.usecase';
import { GetUserByIdUseCase } from '../../application/user/get-user.usercase';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/user/user.entity';
import { IUserRepository } from '../../domain/user/user.repository';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  async create(@Body() dto: CreateUserDto) {
    const user = new User({
      email: dto.email,
      name: dto.name,
    });

    return this.createUserUseCase.execute(user);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios devuelta correctamente' })
  async findAll() {
    return this.userRepository.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('id') id: number) {
    return this.getUserByIdUseCase.execute(id);
  }
}
