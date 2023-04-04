import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from 'src/auth/auth.service';
import { ResponseSignIn, SignInUserDto } from 'src/auth/dto/signin-auth.dto';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUser } from 'src/users/dto/general-user.dto';

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
    // : Promise<ResponseUser | Error>
    // : Promise<string | Error>
    return await this.authService.signIn(body);
  }
}
