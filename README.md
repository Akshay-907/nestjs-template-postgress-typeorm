To integrate a PostgreSQL database connection into your NestJS application, you need to follow a structured approach. Below is a step-by-step guide to set up the initial code setup for connecting to a PostgreSQL database in your project.

### **Step 1: Install Required Dependencies**
First, install the necessary packages for PostgreSQL and TypeORM (which is commonly used with NestJS for database interactions):

```bash
npm install @nestjs/typeorm typeorm pg
```

- `@nestjs/typeorm`: Integrates TypeORM with NestJS.
- `typeorm`: The ORM library for managing database interactions.
- `pg`: The PostgreSQL driver for TypeORM.

### **Step 2: Configure TypeORM**
Create a configuration file for TypeORM in your `src` directory. You can name it `typeorm.config.ts`.

#### **typeorm.config.ts**
```typescript
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // Specify the database type
  host: process.env.POSTGRES_HOST || 'localhost', // Database host
  port: parseInt(process.env.POSTGRES_PORT) || 5432, // Database port
  username: process.env.POSTGRES_USER || 'postgres', // Database username
  password: process.env.POSTGRES_PASSWORD || 'password', // Database password
  database: process.env.POSTGRES_DATABASE || 'nestjs_template', // Database name
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true', // Synchronize schema with entities
  logging: process.env.TYPEORM_LOGGING === 'true', // Enable logging for queries
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Path to entity files
  migrations: [__dirname + '/../migrations/*{.ts,.js}'], // Path to migration files
  cli: {
    migrationsDir: 'src/migrations', // Directory for migration files
  },
};
```

#### **Explanation:**
- **Environment Variables:** Use environment variables (`process.env`) to configure the database connection. This keeps sensitive information out of the codebase.
- **Entities:** Specifies the path where TypeORM will look for entity files.
- **Migrations:** Specifies the path for database migration files (optional but recommended for schema management).
- **Synchronize:** Set to `true` during development to automatically sync the database schema with your entities. In production, this should be disabled and replaced with migrations.

### **Step 3: Update `main.ts`**
Modify your `main.ts` file to include the TypeORM module and load the configuration.

#### **main.ts**
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Documentation (Optional)
  const config = new DocumentBuilder()
    .setTitle('NestJS Template API')
    .setDescription('API documentation for the NestJS template project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the server
  await app.listen(3000, () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}

bootstrap();
```

### **Step 4: Update `app.module.ts`**
Import the `TypeOrmModule` and provide the TypeORM configuration in the `AppModule`.

#### **app.module.ts**
```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './modules/application-settings/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // Initialize TypeORM with the configuration
    ConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

#### **Explanation:**
- **TypeOrmModule.forRoot():** Initializes TypeORM with the configuration defined in `typeorm.config.ts`.
- **ConfigurationModule:** Imports your existing module. Ensure that any entities used by this module are properly registered with TypeORM.

### **Step 5: Create a Sample Entity**
To demonstrate the integration, create a sample entity in your `entities` folder. For example, let's create a `User` entity.

#### **user.entity.ts**
```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
```

#### **Explanation:**
- **@Entity():** Marks the class as an entity.
- **@PrimaryGeneratedColumn():** Defines the primary key column, which is auto-generated.
- **@Column():** Defines regular columns in the database table.

### **Step 6: Update `configuration.module.ts`**
If you have existing entities in your `configuration.module`, ensure they are properly registered with TypeORM. Add them to the `imports` array using `TypeOrmModule.forFeature()`.

#### **configuration.module.ts**
```typescript
import { Module } from '@nestjs/common';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './entities/configuration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Configuration])], // Register entities used in this module
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
})
export class ConfigurationModule {}
```

### **Step 7: Create a Migration File (Optional)**
If you want to manage your database schema using migrations, you can generate a migration file using the TypeORM CLI.

#### **Generate Migration:**
```bash
nest g migration InitialMigration
```

This will create a migration file in the `src/migrations` directory. You can define schema changes in this file.

#### **Run Migrations:**
After defining your migrations, run them to apply the changes to the database:
```bash
npx typeorm migration:run
```

### **Step 8: Test the Connection**
Start your NestJS application:
```bash
npm start
```

Check the logs to ensure that TypeORM successfully connects to the PostgreSQL database. If everything is configured correctly, you should see messages indicating that the connection was established.

### **Final Folder Structure**
Your updated folder structure might look like this:

```
nestjs-template/
├── dist/
├── node_modules/
├── src/
│   ├── database/
│   │   └── typeorm.config.ts
│   ├── modules/
│   │   └── application-settings/
│   │       ├── configuration/
│   │       │   ├── dto/
│   │       │   ├── entities/
│   │       │   │   └── configuration.entity.ts
│   │       │   ├── configuration.controller.ts
│   │       │   ├── configuration.module.ts
│   │       │   ├── configuration.service.spec.ts
│   │       │   ├── configuration.service.ts
│   │       │   └── custom-labels/
│   │       └── user/  # Example module for the User entity
│   │           ├── entities/
│   │           │   └── user.entity.ts
│   │           └── user.module.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   └── migrations/  # Migration files generated by TypeORM
└── .env  # Environment variables file
```

### **Environment Variables (.env)**
Create a `.env` file in the root of your project to store database credentials and other configuration values:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=nestjs_template
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=true
```

### **Summary**
1. Installed required dependencies.
2. Configured TypeORM with environment variables.
3. Updated `main.ts` and `app.module.ts` to integrate TypeORM.
4. Created a sample entity and ensured it is registered with TypeORM.
5. Optional: Used migrations for schema management.

With these steps, your NestJS application is now integrated with a PostgreSQL database. You can expand upon this foundation by adding more entities, services, and controllers as needed.