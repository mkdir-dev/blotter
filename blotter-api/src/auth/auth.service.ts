import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthError } from 'src/common/errors/errors';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUser } from 'src/users/dto/general-user.dto';
import { SignInUserDto } from './dto/signin-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signUp(data: CreateUserDto): Promise<ResponseUser | Error> {
    return await this.userService.createUser(data);
  }

  async signIn(data: SignInUserDto) {
    const { email } = data;

    const existUser = await this.userService.existUserByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AuthError.UserUnauthError);
    }
  }
}
