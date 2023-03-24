import {
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, ResponseCreateUserDto } from './dto/create-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseCreateUserDto | Error> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiTags('users')
  @ApiResponse({ status: 200 })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param() params: GetUserByIdDto) {
    return this.usersService.getUserById(params.id);
  }
}
