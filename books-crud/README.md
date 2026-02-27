# Books CRUD - Hexagonal Architecture

##  Estructura del Proyecto

```
src/
├── domain/                    # Core business logic
│   ├── entities/             # Business entities
│   │   └── BookEntity.ts
│   ├── repositories/          # Repository interfaces
│   │   └── IBookRepository.ts
│   └── value-objects/        # Value objects
├── application/              # Use cases
│   ├── commands/            # Write operations
│   │   ├── CreateBookCommand.ts
│   │   ├── UpdateBookCommand.ts
│   │   └── DeleteBookCommand.ts
│   ├── queries/             # Read operations
│   │   ├── GetBookByIdQuery.ts
│   │   └── ListBooksQuery.ts
│   └── dto/                 # Data Transfer Objects
│       ├── CreateBookDto.ts
│       ├── UpdateBookDto.ts
│       └── BookResponseDto.ts
└── infrastructure/          # External concerns
    ├── repositories/        # Repository implementations
    │   └── DynamoDbBookRepositoryImpl.ts
    ├── lambda/              # Lambda handlers
    │   ├── handlers/        
    │   └── bootstrap.ts
    └── database/            # Database setup
```

##  Commands

```bash
# Development with serverless offline
npm run sls:dev

# Deploy to environments
npm run sls:deploy:dev  # Development
npm run sls:deploy:prod  # Production

# Build TypeScript
npm run build

# Local development
npm run dev
```
