import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

export const configuration: TypeOrmModuleOptions = {
  type: 'postgres',
  username: process.env.DB_USER, //'postgres',
  password: process.env.DB_PASSWORD, //'Juanignacio97',
  host: process.env.DB_HOST, //'localhost',
  port: 5432,
  database: process.env.DB_NAME, //'todo',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
