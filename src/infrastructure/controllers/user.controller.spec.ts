import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '../../application/user/create-user.usecase';
import { GetUserByIdUseCase } from '../../application/user/get-user.usercase';
import { IUserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockCreateUserUseCase: jest.Mocked<CreateUserUseCase>;
  let mockGetUserByIdUseCase: jest.Mocked<GetUserByIdUseCase>;

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };

    mockCreateUserUseCase = {
      execute: jest.fn(),
    } as any;

    mockGetUserByIdUseCase = {
      execute: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: CreateUserUseCase, useValue: mockCreateUserUseCase },
        { provide: 'IUserRepository', useValue: mockUserRepository },
        { provide: GetUserByIdUseCase, useValue: mockGetUserByIdUseCase },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('debería crear un usuario', async () => {
    const dto: CreateUserDto = { email: 'john@example.com', name: 'John' };
    const user = new User({ ...dto, id: 1 });
    mockCreateUserUseCase.execute.mockResolvedValue(user);

    const result = await controller.create(dto);

    expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(expect.any(User));
    expect(result).toEqual(user);
  });

  it('debería obtener lista de usuarios', async () => {
    const users = [new User({ id: 1, email: 'john@example.com', name: 'John' })];
    mockUserRepository.findAll.mockResolvedValue(users);

    const result = await controller.findAll();

    expect(mockUserRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('debería obtener un usuario por ID', async () => {
    const user = new User({ id: 1, email: 'john@example.com', name: 'John' });
    mockGetUserByIdUseCase.execute.mockResolvedValue(user);

    const result = await controller.findOne(1);

    expect(mockGetUserByIdUseCase.execute).toHaveBeenCalledWith(1);
    expect(result).toEqual(user);
  });
});
