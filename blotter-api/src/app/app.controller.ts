import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from 'src/auth/auth.service';
import { ResponseSignIn, SignInUserDto } from 'src/auth/dto/signin-auth.dto';
import { JwtPayloadWithRT } from 'src/auth/types/jwt-payload.type';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ResponseRegisterUser } from 'src/users/dto/general-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('auth')
  @ApiResponse({ status: HttpStatus.CREATED, type: RegisterUserDto })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() body: RegisterUserDto,
  ): Promise<ResponseRegisterUser | Error> {
    return await this.authService.signUp(body);
  }

  @ApiTags('auth')
  @ApiResponse({ status: HttpStatus.OK, type: SignInUserDto })
  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: SignInUserDto): Promise<ResponseSignIn> {
    return await this.authService.signIn(body);
  }

  @ApiTags('auth')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@GetCurrentUser() user: JwtPayloadWithRT) {
    const id = user.sub;

    return await this.authService.logout(id);
  }

  @ApiTags('auth')
  @ApiResponse({ status: HttpStatus.OK })
  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetCurrentUser('refreshToken') user: JwtPayloadWithRT,
  ): Promise<ResponseSignIn> {
    const { email, refreshToken } = user;

    return await this.authService.refreshToken(email, refreshToken);
  }
}
