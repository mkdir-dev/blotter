import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { handleUpdateUserRoute } from './middlewares/handleBodyUpdateUser';
import { FindUserByIdDto, ResponseUser } from './dto/general-user.dto';
import { RegisterUserDto } from './dto/create-user.dto';
import {
  GetUsersQueryParamsDto,
  ResponseUsersPagination,
} from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // private readonly filesService: FilesService,

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.CREATED, type: RegisterUserDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async registerUser(
    @Body() body: RegisterUserDto,
  ): Promise<ResponseUser | Error> {
    return await this.usersService.registerUser(body);
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

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.OK })
  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  async uploadAvatar(
    @Param() params: FindUserByIdDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseUser | Error> {
    const { id } = params;

    return await this.usersService.uploadAvatar(id, file);
  }

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param() params: FindUserByIdDto): Promise<string | Error> {
    const { id } = params;

    return await this.usersService.deleteUser(id);
  }

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteManyUsers(@Body() body: DeleteUserDto): Promise<string | Error> {
    return await this.usersService.deleteManyUsers(body);
  }
}
