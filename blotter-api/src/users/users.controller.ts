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
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Role } from 'src/common/decorators/role.decorator';
import { AdminRoleGuard } from 'src/common/guards/role.guard';
import { UsersService } from './users.service';
import { handleUpdateUserRoute } from './middlewares/handleBodyUpdateUser';
import { FindUserByIdDto, ResponseUser } from './dto/general-user.dto';
import {
  GetUsersQueryParamsDto,
  ResponseUsersPagination,
} from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { roleEnum } from './enums/role.enum';
import { AccessCheckUserGuard } from 'src/common/guards/access-check-user.guard';

/*
import { Role } from 'src/common/decorators/role.decorator';
import { AdminRoleGuard } from 'src/common/guards/role.guard';
import { roleEnum } from 'src/users/enums/role.enum';

 @ApiTags('auth')
  @ApiResponse({ status: HttpStatus.OK })
  @Public()
  @Role(roleEnum.admin)
  @UseGuards(AuthGuard('jwt-refresh'), AdminRoleGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetCurrentUser('refreshToken') user: JwtPayloadWithRT,
  ): Promise<ResponseSignIn> {
    const { email, refreshToken } = user;

    return await this.authService.refreshToken(email, refreshToken);
  }
*/

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  @Role(roleEnum.admin)
  @UseGuards(AdminRoleGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(
    @Query() query: GetUsersQueryParamsDto,
  ): Promise<ResponseUsersPagination | Error> {
    return await this.usersService.getUsers(query);
  }

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(AccessCheckUserGuard)
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
  @UseGuards(AccessCheckUserGuard)
  @Post('avatar/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
    }),
  )
  @HttpCode(HttpStatus.OK)
  async uploadAvatar(
    @Param() params: FindUserByIdDto,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<ResponseUser | Error> {
    const { id } = params;

    return await this.usersService.uploadAvatar(id, file);
  }

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @UseGuards(AccessCheckUserGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param() params: FindUserByIdDto): Promise<string | Error> {
    const { id } = params;

    return await this.usersService.deleteUser(id);
  }

  @ApiTags('users')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Role(roleEnum.admin)
  @UseGuards(AdminRoleGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteManyUsers(@Body() body: DeleteUserDto): Promise<string | Error> {
    return await this.usersService.deleteManyUsers(body);
  }
}
