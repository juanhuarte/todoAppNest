import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { ItemsController } from './controllers/items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from './items.entity';
import { Folders } from 'src/folders/folders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Items, Folders])],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
