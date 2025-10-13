import { IsNotEmpty, IsString, IsEnum, IsDate, IsInt } from 'class-validator';
import { TaskStatus } from '../../domain/task/task.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @ApiProperty({ example: 'Implementar endpoint de creación de tareas' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Crear endpoint POST /tasks con validación y lógica de negocio' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.PENDING })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({ example: '2025-12-31' })
  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;
}
