import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { AuthError } from 'src/common/errors/errors';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseRegisterUser } from 'src/users/dto/general-user.dto';
import { ResponseSignIn, SignInUserDto } from './dto/signin-auth.dto';
import { GetTokenDto } from './dto/get-tokens.dto';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(data: CreateUserDto): Promise<ResponseRegisterUser> {
    return await this.userService.createUser(data);
  }

  async signIn(data: SignInUserDto): Promise<ResponseSignIn> {
    const { email, password } = data;

    const user = await this.userService.existUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(AuthError.UserUnauthError);
    }

    const validatePass = await bcrypt.compare(password, user.password);

    if (!validatePass) {
      throw new UnauthorizedException(AuthError.UserUnauthError);
    }

    const tokens = await this.getTokens({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    await this.userService
      .updateRT(user._id, tokens.refresh_token)
      .catch(() => {
        throw new UnauthorizedException(AuthError.UnauthorizedError);
      });

    return tokens;
  }

  async refreshToken(email: string, rt: string): Promise<ResponseSignIn> {
    const user = await this.userService.existUserByEmail(email);

    if (!user || !user.hashRT) {
      throw new UnauthorizedException(AuthError.UnauthorizedError);
    }

    await bcrypt.compare(rt, user.hashRT).then((matched) => {
      if (!matched) {
        throw new UnauthorizedException(AuthError.UnauthorizedError);
      }
    });

    const tokens = await this.getTokens({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    await this.userService
      .updateRT(user._id, tokens.refresh_token)
      .catch(() => {
        throw new UnauthorizedException(AuthError.UnauthorizedError);
      });

    return tokens;
  }

  async logout(id: string) {
    return await this.userService.updateRT(id, null);
  }

  async getTokens(data: GetTokenDto): Promise<ResponseSignIn> {
    const { id, username, email, role } = data;
    const jwtPayload: JwtPayload = { sub: id, username, email, role };

    const expiresIn_at_jwt = this.configService.get<string | number>(
      'at_jwt_secret_key_timeout',
    );
    const expiresIn_rt_jwt = this.configService.get<string | number>(
      'rt_jwt_secret_key_timeout',
    );
    const accessTokenExpiry = Date.now() + Number(expiresIn_at_jwt) - 300000;
    const refreshTokenExpiry = Date.now() + Number(expiresIn_rt_jwt) - 600000;

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('at_jwt_secret_key'),
        expiresIn: expiresIn_at_jwt,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('rt_jwt_secret_key'),
        expiresIn: expiresIn_rt_jwt,
      }),
    ]).catch(() => {
      throw new UnauthorizedException(AuthError.TokenInternalServerError);
    });

    return {
      access_token,
      refresh_token,
      accessTokenExpiry,
      refreshTokenExpiry,
    };
  }
}
