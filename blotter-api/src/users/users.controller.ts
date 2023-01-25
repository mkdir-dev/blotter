import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, ResponseCreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseCreateUserDto | Error> {
    return this.usersService.createUser(createUserDto);
  }
}
