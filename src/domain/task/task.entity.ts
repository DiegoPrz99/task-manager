export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  id?: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date;
  userId: number;
  deleted: boolean;
  
  constructor(props: {
    id?: number;
    title: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: Date;
    userId: number;
    deleted?: boolean;
  }) {

    if (!props.title || props.title.trim() === '') {
      throw new Error('El título de la tarea es obligatorio');
    }

    if (props.dueDate && props.dueDate < new Date()) {
      throw new Error('La fecha de vencimiento no puede ser en el pasado');
    }

    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.status = props.status ?? TaskStatus.PENDING;
    this.dueDate = props.dueDate;
    this.userId = props.userId;
    this.deleted = props.deleted ?? false;
  }
}

