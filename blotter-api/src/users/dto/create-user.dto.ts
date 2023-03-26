import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';

import { BirthdayValidation } from 'src/common/validation/general/general-validation';
import {
  EmailValidation,
  GenderValidation,
  NameValidation,
  NationalityValidation,
  PasswordValidation,
  PhoneValidation,
  RoleValidation,
  StatusValidation,
  SurnameValidation,
  UsernameValidation,
  СityValidation,
  СountryValidation,
} from 'src/common/validation/users/users-validation';
import { genderEnum } from '../enums/gender.enum';
import { roleEnum } from '../enums/role.enum';
import { statusEnum } from '../enums/status.enum';

export class RegisterUserDto {
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

export class CreateUserDto extends RegisterUserDto {
  @ApiProperty({ required: false })
  @IsString({ message: NameValidation.IsString })
  @IsNotEmpty({ message: NameValidation.IsNotEmpty })
  readonly name?: string;

  @ApiProperty({ required: false })
  @IsString({ message: SurnameValidation.IsString })
  @IsNotEmpty({ message: SurnameValidation.IsNotEmpty })
  readonly surname?: string;

  @ApiProperty({ required: false })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: BirthdayValidation.IsNumber },
  )
  @IsNotEmpty({ message: BirthdayValidation.IsNotEmpty })
  readonly birthday?: number;

  @ApiProperty({ required: false })
  @IsString({ message: PhoneValidation.IsString })
  @IsNotEmpty({ message: PhoneValidation.IsNotEmpty })
  @IsPhoneNumber('RU', { message: PhoneValidation.IsPhoneNumber })
  readonly phone?: string;

  @ApiProperty({ required: false })
  @IsString({ message: NationalityValidation.IsString })
  @IsNotEmpty({ message: NationalityValidation.IsNotEmpty })
  readonly nationality?: string;

  @ApiProperty({ required: false })
  @IsString({ message: СountryValidation.IsString })
  @IsNotEmpty({ message: СountryValidation.IsNotEmpty })
  readonly country?: string;

  @ApiProperty({ required: false })
  @IsString({ message: СityValidation.IsString })
  @IsNotEmpty({ message: СityValidation.IsNotEmpty })
  readonly city?: string;

  @ApiProperty({ required: false })
  @IsString({ message: GenderValidation.IsString })
  @IsNotEmpty({ message: GenderValidation.IsNotEmpty })
  @IsEnum(genderEnum, { message: GenderValidation.IsEnum })
  readonly gender?: 'male' | 'female' | 'non-binary';

  @ApiProperty({ required: false })
  @IsString({ message: RoleValidation.IsString })
  @IsNotEmpty({ message: RoleValidation.IsNotEmpty })
  @IsEnum(roleEnum, { message: RoleValidation.IsEnum })
  readonly role?: 'user' | 'admin';

  @ApiProperty({ required: false })
  @IsString({ message: StatusValidation.IsString })
  @IsNotEmpty({ message: StatusValidation.IsNotEmpty })
  @IsEnum(statusEnum, { message: StatusValidation.IsEnum })
  readonly status?: 'block' | 'active';
}
