import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUser(@Query() filterQuery) {
    return this.userService.findOne(filterQuery);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
