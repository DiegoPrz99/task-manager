export class User {
  id?: number;
  email: string;
  name: string;
  createdAt: Date;

  constructor(props: { id?: number; email: string; name?: string; createdAt?: Date }) {
    if (!props.email || !this.validateEmail(props.email)) {
      throw new Error('Email inválido');
    }

    if (!props.name || props.name.trim() === '') {
      throw new Error('El nombre es obligatorio');
    }

    this.id = props.id;
    this.email = props.email.toLowerCase().trim();
    this.name = props.name.trim();
    this.createdAt = props.createdAt ?? new Date();
  }

  changeName(newName: string) {
    if (!newName || newName.trim() === '') {
      throw new Error('El nuevo nombre no puede estar vacío');
    }
    this.name = newName.trim();
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
