import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
import {
  EmailValidation,
  PasswordValidation,
} from 'src/common/validation/users/users-validation';

export class SignInUserDto {
  @ApiProperty({
    minLength: 8,
  })
  @IsString({ message: PasswordValidation.IsString })
  @IsNotEmpty({ message: PasswordValidation.IsNotEmpty })
  @MinLength(8, { message: PasswordValidation.MinLength })
  readonly password: string;

  @ApiProperty({
    description: 'email: example@mail.com',
    minLength: 8,
  })
  @IsString({ message: EmailValidation.IsString })
  @IsNotEmpty({ message: EmailValidation.IsNotEmpty })
  @MinLength(8, { message: EmailValidation.MinLength })
  @IsEmail({}, { message: EmailValidation.IsEmail })
  readonly email: string;
}

export class ResponseSignIn {
  readonly access_token: string;
  readonly refresh_token: string;
}
