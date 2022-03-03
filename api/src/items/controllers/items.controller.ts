import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateItemDto } from '../dto/create-item.dto';
import { ItemsService } from '../services/items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Post(':id')
  createItem(@Param('id') id: number, @Body() body: CreateItemDto) {
    return this.itemService.create(id, body);
  }

  @Get(':id')
  getAllItems(@Param('id') id: number) {
    return this.itemService.find(id);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: number) {
    return this.itemService.delete(id);
  }

  @Put(':id')
  updateItem(@Param('id') id: number, @Body() body: CreateItemDto) {
    return this.itemService.update(id, body);
  }
}
