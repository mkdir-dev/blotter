import {
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto, ResponseCreateUserDto } from './dto/create-user.dto';
import {
  GetUserByIdDto,
  GetUsersQueryParamsDto,
  ResponseGetUser,
  ResponseGetUsersPagination,
} from './dto/get-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseCreateUserDto | Error> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.OK })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(
    @Param() params: GetUserByIdDto,
  ): Promise<ResponseGetUser | Error> {
    return this.usersService.getUserById(params.id);
  }

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers(
    @Query() query: GetUsersQueryParamsDto,
  ): Promise<ResponseGetUsersPagination | Error> {
    return this.usersService.getUsers(query);
  }
}
