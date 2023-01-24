import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUser } from './types/create-user.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUser> {
    return this.usersService.createUser(createUserDto);
  }
}
