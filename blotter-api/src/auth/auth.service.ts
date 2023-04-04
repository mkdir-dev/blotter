import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { AuthError } from 'src/common/errors/errors';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUser } from 'src/users/dto/general-user.dto';
import { ResponseSignIn, SignInUserDto } from './dto/signin-auth.dto';
import { GetTokensDto } from './dto/get-tokens.dto';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(data: CreateUserDto): Promise<ResponseUser> {
    // return await this.userService.createUser(data);
    const user = await this.userService.createUser(data);

    /*
    const tokens = await this.getTokens({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    await this.userService.updateRT(user.id, tokens.refresh_token);
    */

    return user;
  }

  async signIn(data: SignInUserDto): Promise<ResponseSignIn> {
    const { email, password } = data;

    const user = await this.userService.existUserByEmail(email).catch(() => {
      throw new UnauthorizedException(AuthError.UserUnauthError);
    });
    const validatePass = await bcrypt.compare(password, user.password);

    if (!validatePass) {
      throw new UnauthorizedException(AuthError.UserUnauthError);
    }

    const tokens = await this.getTokens({
      id: user._id,
      username: user.username,
      email: user.email,
    });

    await this.userService.updateRT(user._id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(data: GetTokensDto): Promise<ResponseSignIn> {
    const { id, username, email } = data;
    const jwtPayload: JwtPayload = {
      sub: id,
      username,
      email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('at_jwt_secret_key'),
        expiresIn: this.configService.get<string | number>(
          'at_jwt_secret_key_timeout',
        ),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('rt_jwt_secret_key'),
        expiresIn: this.configService.get<string | number>(
          'rt_jwt_secret_key_timeout',
        ),
      }),
    ]).catch(() => {
      throw new UnauthorizedException(AuthError.TokenInternalServerError);
    });

    return { access_token, refresh_token };
  }
}
