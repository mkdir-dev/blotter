import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsEmail,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

import { UsernameValidation } from 'src/common/validation/users/username/username-validation';
import { PasswordValidation } from 'src/common/validation/users/password/password-validation';
import { EmailValidation } from 'src/common/validation/users/email/email-validation';

export class CreateUserDto {
  @ApiProperty({
    minLength: 4,
    maxLength: 40,
  })
  @IsString({ message: UsernameValidation.IsString })
  @IsNotEmpty({ message: UsernameValidation.IsNotEmpty })
  @MinLength(4, { message: UsernameValidation.MinLength })
  @MaxLength(40, { message: UsernameValidation.MaxLength })
  readonly username: string;

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

export class ResponseCreateUserDto {
  readonly id: string;
  readonly uuid: string;
  readonly username: string;
  readonly email: string;
}

// ! для создания админа
// role: string[];

/*
uuid: string; // @Prop({ required: true, unique: true })
  username: string; // @Prop({ required: true, unique: true })
  password: string; // @Prop({ required: true, minLength: 8 })
  email: string; // @Prop({ required: true, unique: true })
*/

/*
// @Prop({ default: null })
  name: string | null;

  // @Prop({ default: null })
  surname: string | null;

  // @Prop({ default: null })
  avatar: string | null;

  // @Prop({ default: null })
  phone: number | null;

  // @Prop({ default: null })
  country: string | null;

  // @Prop({ default: null })
  city: string | null;

  // @Prop({ default: null, enum: Object.values(genderEnum) })
  gender: string | null;

  // @Prop({ default: null })
  createdAt: string | null;

  /*
  @Prop({
    type: [String],
    default: [roleEnum.user],
    enum: Object.values(roleEnum),
  })
  */
// role: string[];

// @Prop({ default: statusEnum.active, enum: Object.values(statusEnum) })
// status: 'active' | 'block';
