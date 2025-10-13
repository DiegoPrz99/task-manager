import { CreateUserUseCase } from './create-user.usecase';
import { IUserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import { BadRequestException } from '@nestjs/common';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockUserRepo: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };

    useCase = new CreateUserUseCase(mockUserRepo);
  });

  it('debería crear un usuario nuevo si el email no existe', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);

    const data = { email: 'test@example.com', name: 'John' };
    const createdUser = new User({ ...data, id: 1 });

    mockUserRepo.create.mockResolvedValue(createdUser);

    const result = await useCase.execute(data);

    expect(mockUserRepo.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockUserRepo.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(createdUser);
  });

  it('debería lanzar error si el email ya existe', async () => {
    const existingUser = new User({ id: 1, email: 'test@example.com', name: 'John' });
    mockUserRepo.findByEmail.mockResolvedValue(existingUser);

    await expect(
      useCase.execute({ email: 'test@example.com', name: 'New User' }),
    ).rejects.toThrow(BadRequestException);

    expect(mockUserRepo.create).not.toHaveBeenCalled();
  });

  it('debería lanzar error si hay problema al crear', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);
    mockUserRepo.create.mockRejectedValue(new Error('DB error'));

    await expect(
      useCase.execute({ email: 'fail@example.com', name: 'John' }),
    ).rejects.toThrow(BadRequestException);
  });
});
