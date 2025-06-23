// module.exports = {
//   development: {
//     username: 'akshay',
//     password: 'E1719prbu',
//     database: 'application_settings',
//     host: '127.0.0.1',
//     dialect: 'mysql',
//   },
// };

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
  // cli: {
  //   migrationsDir: 'src/migrations', // Directory for migration files
  // },
};
