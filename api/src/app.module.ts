import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './orm.config';
import { FoldersModule } from './folders/folders.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configuration),
    UsersModule,
    FoldersModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
