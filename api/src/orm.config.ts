import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

export const configuration: TypeOrmModuleOptions =
  process.env.NODE_ENV === 'production'
    ? {
        type: 'postgres',
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: 5432,
        database: process.env.DB_NAME,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        synchronize: true,
        entities: ['dist/**/*.entity{.ts,.js}'],
      }
    : {
        type: 'postgres',
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: 5432,
        database: process.env.DB_NAME,
        synchronize: true,
        entities: ['dist/**/*.entity{.ts,.js}'],
      };
