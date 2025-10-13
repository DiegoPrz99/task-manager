# Task Manager API

Gestión de tareas con NestJS y arquitectura hexagonal. Esta aplicación proporciona un sistema robusto y escalable para crear, actualizar y eliminar tareas, permitiendo a los usuarios organizar su trabajo de manera eficiente.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Ejemplos de Uso](#ejemplos-de-uso)

---

## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes en tu sistema:

- **Node.js** (versión 18 o superior)
- **npm** (versión 9 o superior)
- **PostgreSQL** (versión 12 o superior)
- **Docker** (opcional, para ejecutar con contenedores)
- **Docker Compose** (opcional, versión 1.29 o superior)

---

## Instalación

### Opción 1: Instalación Local

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clonar el repositorio:**

```bash
git clone https://github.com/DiegoPrz99/task-manager.git
cd task-manager
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno:**

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=root
DB_NAME=taskdb
```

4. **Crear la base de datos:**

Asegúrate de que PostgreSQL esté ejecutándose y crea la base de datos:

```bash
createdb taskdb
```

### Opción 2: Instalación con Docker

Si prefieres usar Docker, simplemente ejecuta:

1. **Crea un archivo `.env`:**

```bash
cp .env.example .env
```

2. **Inicia los contenedores:**

```bash
docker-compose up -d
```

Docker Compose levantará tanto PostgreSQL como la aplicación NestJS automáticamente.

---

## Ejecución

### Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo con recarga en caliente:

```bash
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3000`

### Documentación Interactiva

Una vez que la aplicación esté ejecutándose, accede a la documentación interactiva de Swagger:

```
http://localhost:3000/api/docs
```

---

## Arquitectura

### Arquitectura Hexagonal (Ports & Adapters)

Este proyecto implementa la **Arquitectura Hexagonal**, también conocida como Architecture de Puertos y Adaptadores. Esta arquitectura aísla la lógica de negocio del mundo externo, permitiendo cambiar fácilmente las implementaciones externas sin afectar el core de la aplicación.

#### Capas de la Arquitectura:

1. **Domain (Núcleo del Negocio):**
   - Contiene las entidades de negocio (`Task`, `User`)
   - Define los contratos de los repositorios (interfaces)
   - No depende de ninguna otra capa
   - Encapsula las reglas de negocio y validaciones esenciales

2. **Application (Casos de Uso):**
   - Implementa la lógica de orquestación de la aplicación
   - Utiliza los Use Cases para ejecutar operaciones
   - Inyecta las dependencias del Domain a través de la inyección de dependencias
   - No conoce detalles de la infraestructura

3. **Infrastructure (Adaptadores):**
   - Controllers: Puntos de entrada HTTP
   - Persistence: Implementaciones concretas de repositorios usando TypeORM
   - Config: Configuración de base de datos
   - DTOs: Objetos de transferencia de datos

#### Ventajas de esta Arquitectura:

- **Independencia de Frameworks:** La lógica de negocio no depende de NestJS o TypeORM
- **Testabilidad:** Las capas internas son fáciles de probar con mocks
- **Escalabilidad:** Fácil agregar nuevas funcionalidades sin afectar código existente
- **Mantenibilidad:** Código organizado y con responsabilidades claras

---

## Estructura del Proyecto

```
task-manager/
├── src/
│   ├── application/              # Casos de uso (Use Cases)
│   │   ├── task/
│   │   │   ├── create-task.usecase.ts
│   │   │   ├── get-tasks-by-user.usecase.ts
│   │   │   ├── update-task-status.usecase.ts
│   │   │   └── soft-delete-task.usecase.ts
│   │   └── user/
│   │       └── create-user.usecase.ts
│   │
│   ├── domain/                   # Lógica de negocio y contratos
│   │   ├── task/
│   │   │   ├── task.entity.ts    # Entidad Task con validaciones
│   │   │   └── task.repository.ts # Interfaz del repositorio
│   │   └── user/
│   │       ├── user.entity.ts    # Entidad User con validaciones
│   │       └── user.repository.ts # Interfaz del repositorio
│   │
│   ├── infrastructure/           # Adaptadores e implementaciones técnicas
│   │   ├── config/
│   │   │   └── typeorm.config.ts # Configuración de TypeORM
│   │   ├── controllers/
│   │   │   ├── task.controller.ts # Endpoints de tareas
│   │   │   └── user.controller.ts # Endpoints de usuarios
│   │   ├── dtos/
│   │   │   ├── create-task.dto.ts
│   │   │   └── create-user.dto.ts
│   │   └── persistence/
│   │       └── typeorm/
│   │           ├── task.orm-entity.ts # Entidad ORM para Task
│   │           ├── task.repository.impl.ts # Implementación del repositorio
│   │           ├── user.orm-entity.ts # Entidad ORM para User
│   │           └── user.repository.impl.ts # Implementación del repositorio
│   │
│   ├── app.module.ts             # Módulo raíz de NestJS
│   └── main.ts                   # Punto de entrada de la aplicación
│
├── test/                         # Pruebas E2E
├── docker-compose.yml            # Configuración de Docker
├── .env.example                  # Variables de entorno de ejemplo
└── package.json                  # Dependencias del proyecto
```

### Descripción de Carpetas Clave:

**domain/** - Contiene la lógica empresarial pura:
- Entidades: Representan los objetos del negocio
- Repositorios (interfaces): Definen contratos para persistencia

**application/** - Orquesta el flujo de negocio:
- Use Cases: Implementan operaciones específicas
- Inyección de dependencias de repositorios

**infrastructure/** - Detalles técnicos:
- Controllers: Traducen peticiones HTTP a Use Cases
- Persistence: Implementa repositorios usando TypeORM
- DTOs: Definen la forma de datos que entra/sale de la API

---

## API Endpoints

### Gestión de Usuarios

#### Crear un Usuario

```http
POST /users
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "name": "John Doe"
}
```

**Response (201 Created):**

```json
{
  "id": 1,
  "email": "john.doe@example.com",
  "name": "John Doe",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

#### Obtener Todos los Usuarios

```http
GET /users
```

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Doe",
    "createdAt": "2025-01-15T10:30:00Z"
  },
  {
    "id": 2,
    "email": "jane.smith@example.com",
    "name": "Jane Smith",
    "createdAt": "2025-01-16T14:45:00Z"
  }
]
```

#### Obtener Usuario por ID

```http
GET /users/:id
```

**Response (200 OK):**

```json
{
  "id": 1,
  "email": "john.doe@example.com",
  "name": "John Doe",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

---

### Gestión de Tareas

#### Crear una Tarea

```http
POST /tasks
Content-Type: application/json

{
  "title": "Implementar endpoint de creación de tareas",
  "description": "Crear endpoint POST /tasks con validación y lógica de negocio",
  "status": "PENDING",
  "dueDate": "2025-12-31",
  "userId": 1
}
```

**Response (201 Created):**

```json
{
  "id": 1,
  "title": "Implementar endpoint de creación de tareas",
  "description": "Crear endpoint POST /tasks con validación y lógica de negocio",
  "status": "PENDING",
  "dueDate": "2025-12-31T00:00:00Z",
  "userId": 1,
  "deleted": false
}
```

**Errores Posibles:**

- **404 Not Found:** El usuario especificado no existe
- **400 Bad Request:** Validación fallida (title vacío, dueDate en el pasado, etc.)

#### Obtener Tareas por Usuario

Recupera todas las tareas (o filtradas por estado) de un usuario específico.

```http
GET /tasks/user/:userId
GET /tasks/user/:userId?status=IN_PROGRESS
```

**Parámetros de Query:**
- `status` (opcional): Filtrar por estado (`PENDING`, `IN_PROGRESS`, `DONE`)

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Implementar endpoint de creación de tareas",
    "description": "Crear endpoint POST /tasks con validación",
    "status": "IN_PROGRESS",
    "dueDate": "2025-12-31T00:00:00Z",
    "userId": 1,
    "deleted": false
  },
  {
    "id": 2,
    "title": "Documentar API",
    "description": "Crear documentación completa con ejemplos",
    "status": "PENDING",
    "dueDate": "2025-12-15T00:00:00Z",
    "userId": 1,
    "deleted": false
  }
]
```

#### Actualizar Estado de una Tarea

```http
PATCH /tasks/:taskId/status
Content-Type: application/json

{
  "status": "DONE"
}
```

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Implementar endpoint de creación de tareas",
  "description": "Crear endpoint POST /tasks con validación",
  "status": "DONE",
  "dueDate": "2025-12-31T00:00:00Z",
  "userId": 1,
  "deleted": false
}
```

**Estados Válidos:**
- `PENDING`: Tarea pendiente
- `IN_PROGRESS`: Tarea en progreso
- `DONE`: Tarea completada

#### Eliminar una Tarea (Soft Delete)

Marca una tarea como eliminada sin borrar físicamente de la base de datos.

```http
DELETE /tasks/:taskId
```

**Response (200 OK):**

```json
{
  "message": "Task deleted successfully"
}
```

---

## Ejemplos de Uso

### Caso de Uso 1: Crear un Usuario y sus Tareas

**Paso 1: Crear el usuario**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "name": "Carlos Developer"
  }'
```

**Respuesta:**

```json
{
  "id": 1,
  "email": "developer@example.com",
  "name": "Carlos Developer",
  "createdAt": "2025-01-20T08:00:00Z"
}
```

**Paso 2: Crear tareas para el usuario**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Aprender Arquitectura Hexagonal",
    "description": "Estudiar patrones de arquitectura limpia",
    "status": "IN_PROGRESS",
    "dueDate": "2025-02-28",
    "userId": 1
  }'
```

**Respuesta:**

```json
{
  "id": 1,
  "title": "Aprender Arquitectura Hexagonal",
  "description": "Estudiar patrones de arquitectura limpia",
  "status": "IN_PROGRESS",
  "dueDate": "2025-02-28T00:00:00Z",
  "userId": 1,
  "deleted": false
}
```

**Paso 3: Obtener tareas del usuario**

```bash
curl http://localhost:3000/tasks/user/1
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "title": "Aprender Arquitectura Hexagonal",
    "description": "Estudiar patrones de arquitectura limpia",
    "status": "IN_PROGRESS",
    "dueDate": "2025-02-28T00:00:00Z",
    "userId": 1,
    "deleted": false
  }
]
```

**Paso 4: Marcar tarea como completada**

```bash
curl -X PATCH http://localhost:3000/tasks/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "DONE"}'
```

**Respuesta:**

```json
{
  "id": 1,
  "title": "Aprender Arquitectura Hexagonal",
  "description": "Estudiar patrones de arquitectura limpia",
  "status": "DONE",
  "dueDate": "2025-02-28T00:00:00Z",
  "userId": 1,
  "deleted": false
}
```

### Caso de Uso 2: Filtrar Tareas por Estado

```bash
curl "http://localhost:3000/tasks/user/1?status=PENDING"
```

**Respuesta:**

```json
[
  {
    "id": 2,
    "title": "Revisar código",
    "description": "Code review de los cambios recientes",
    "status": "PENDING",
    "dueDate": "2025-01-25T00:00:00Z",
    "userId": 1,
    "deleted": false
  }
]
```

### Caso de Uso 3: Eliminación de Tarea (Soft Delete)

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

**Respuesta:**

```json
{
  "message": "Task deleted successfully"
}
```

---

## Notas Importantes

- Las tareas usan **soft delete**, lo que significa que no se borran de la base de datos, solo se marcan como eliminadas
- Las **validaciones de negocio** están implementadas en las entidades del Domain
- El **email se normaliza** (minúsculas y espacios trimados) al crear usuarios
- La **fecha de vencimiento** no puede ser en el pasado
- El **título de la tarea** es obligatorio y no puede estar vacío

---
