import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  // Req,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from 'src/auth/auth.service';
import { ResponseSignIn, SignInUserDto } from 'src/auth/dto/signin-auth.dto';
import { JwtPayloadWithRT } from 'src/auth/types/jwt-payload.type';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
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
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@GetCurrentUser() user: JwtPayloadWithRT) {
    const id = user.sub;

    return await this.authService.logout(id);
  }

  @ApiTags('auth')
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetCurrentUser('refreshToken') user: JwtPayloadWithRT,
  ): Promise<ResponseSignIn> {
    const { email, refreshToken } = user;

    return await this.authService.refreshToken(email, refreshToken);
  }
}
