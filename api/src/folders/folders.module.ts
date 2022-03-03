import { Module } from '@nestjs/common';
import { FoldersService } from './services/folders.service';
import { FoldersController } from './controllers/folders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folders } from './folders.entity';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folders, Users])],
  providers: [FoldersService],
  controllers: [FoldersController],
})
export class FoldersModule {}
