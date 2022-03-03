import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFolderDto } from '../dto/create-folder.dto';
import { FoldersService } from '../services/folders.service';
@Controller('folders')
export class FoldersController {
  constructor(private folderService: FoldersService) {}

  @Post(':id')
  createFolder(@Param('id') id: number, @Body() body: CreateFolderDto) {
    return this.folderService.create(id, body);
  }

  @Get(':id')
  getAllFolders(@Param('id') id: number) {
    return this.folderService.find(id);
  }

  @Delete(':id')
  deleteFolder(@Param('id') id: number) {
    return this.folderService.delete(id);
  }

  @Put(':id')
  updateFolder(@Param('id') id: number, @Body() body: CreateFolderDto) {
    return this.folderService.update(id, body);
  }
}
