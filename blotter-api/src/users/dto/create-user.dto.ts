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
  @ApiProperty()
  @IsString({ message: UsernameValidation.IsString })
  @IsNotEmpty({ message: UsernameValidation.IsNotEmpty })
  @MinLength(4, { message: UsernameValidation.MinLength })
  @MaxLength(40, { message: UsernameValidation.MaxLength })
  username: string;

  @ApiProperty()
  @IsString({ message: PasswordValidation.IsString })
  @IsNotEmpty({ message: PasswordValidation.IsNotEmpty })
  @MinLength(8, { message: PasswordValidation.MinLength })
  password: string;

  @ApiProperty()
  @IsString({ message: EmailValidation.IsString })
  @IsNotEmpty({ message: EmailValidation.IsNotEmpty })
  @MinLength(8, { message: EmailValidation.MinLength })
  @IsEmail({ IsEmail: true }, { message: EmailValidation.IsEmail })
  email: string;
}

export class ResponseCreateUserDto {
  uuid: string;
  username: string;
  email: string;
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
  registration_date: string | null;

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
