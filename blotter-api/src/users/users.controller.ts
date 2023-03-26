import {
  Controller,
  Post,
  Get,
  Patch,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { FindUserByIdDto, ResponseUser } from './dto/general-user.dto';
import { RegisterUserDto } from './dto/create-user.dto';
import {
  GetUsersQueryParamsDto,
  ResponseUsersPagination,
} from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleUpdateUserRoute } from './middlewares/handleBodyUpdateUser';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.CREATED, type: RegisterUserDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async registerUser(
    @Body() RegisterUserDto: RegisterUserDto,
  ): Promise<ResponseUser | Error> {
    return await this.usersService.registerUser(RegisterUserDto);
  }

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.OK })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(
    @Param() params: FindUserByIdDto,
  ): Promise<ResponseUser | Error> {
    const { id } = params;

    return await this.usersService.getUserById(id);
  }

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(
    @Query() query: GetUsersQueryParamsDto,
  ): Promise<ResponseUsersPagination | Error> {
    return await this.usersService.getUsers(query);
  }

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.OK })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param() params: FindUserByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUser | Error> {
    const { id } = params;

    handleUpdateUserRoute(updateUserDto);

    return await this.usersService.updateUser({ id, data: updateUserDto });
  }
}
