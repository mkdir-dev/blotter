import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  // Param,
  Req,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from 'src/auth/auth.service';
import { ResponseSignIn, SignInUserDto } from 'src/auth/dto/signin-auth.dto';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUser } from 'src/users/dto/general-user.dto'; // FindUserByIdDto

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('auth')
  @ApiResponse({ status: HttpStatus.CREATED, type: RegisterUserDto })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: RegisterUserDto): Promise<ResponseUser | Error> {
    return await this.authService.signUp(body);
  }

  @ApiTags('auth')
  @ApiResponse({ status: HttpStatus.OK, type: SignInUserDto })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: SignInUserDto): Promise<ResponseSignIn> {
    return await this.authService.signIn(body);
  }

  @ApiTags('auth')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = req?.user;

    return await this.authService.logout(user.sub);
  }

  @ApiTags('auth')
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request): Promise<ResponseSignIn> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = req?.user;

    return await this.authService.refreshToken(user.email, user.refreshToken);
  }
}
