import { genderEnum } from 'src/users/enums/gender.enum';
import { roleEnum } from 'src/users/enums/role.enum';
import { statusEnum } from 'src/users/enums/status.enum';
import {
  UserValid,
  UsernameValid,
  PasswordValid,
  EmailValid,
  PhoneValid,
  EnumValid,
} from './users-validation.types';

export const UsernameValidation: UsernameValid = {
  IsString: 'Логин должен быть строкой',
  IsNotEmpty: 'Логин обязателен для заполнения',
  MinLength: 'Логин должен быть не менее 4 символов',
  MaxLength: 'Логин должен быть не более 40 символов',
};

export const PasswordValidation: PasswordValid = {
  IsString: 'Пароль должен быть строкой',
  IsNotEmpty: 'Пароль обязателен для заполнения',
  MinLength: 'Пароль должен быть не менее 8 символов',
};

export const EmailValidation: EmailValid = {
  IsString: 'Email должен быть строкой',
  IsNotEmpty: 'Email обязателен для заполнения',
  MinLength: 'Email должен быть не менее 8 символов',
  IsEmail: 'Неверный формат email',
};

export const NameValidation: UserValid = {
  IsString: 'Имя должно быть строкой',
  IsNotEmpty: 'Имя не может быть пустым',
};

export const SurnameValidation: UserValid = {
  IsString: 'Фамилия должна быть строкой',
  IsNotEmpty: 'Фамилия не может быть пустой',
};

export const PhoneValidation: PhoneValid = {
  IsString: 'Номер телефона должен быть строкой',
  IsNotEmpty: 'Номер телефона не может быть пустым',
  IsPhoneNumber: 'Неверный формат номера телефона',
};

export const NationalityValidation: UserValid = {
  IsString: 'Национальность должна быть строкой',
  IsNotEmpty: 'Национальность не может быть пустой',
};

export const СountryValidation: UserValid = {
  IsString: 'Название страны должно быть строкой',
  IsNotEmpty: 'Название страны не может быть пустым',
};

export const СityValidation: UserValid = {
  IsString: 'Название города должно быть строкой',
  IsNotEmpty: 'Название города не может быть пустым',
};

export const GenderValidation: EnumValid = {
  IsString: 'Пол должно быть строкой',
  IsNotEmpty: 'Пол не может быть пустым',
  IsEnum: `Неверное значение пола. Возможны только: ${Object.values(
    genderEnum,
  ).join(', ')}`,
};

export const RoleValidation: EnumValid = {
  IsString: 'Роль пользователя должна быть строкой',
  IsNotEmpty: 'Роль пользователя не может быть пустым',
  IsEnum: `Неверное значение роли пользователя. Возможны только: ${Object.values(
    roleEnum,
  ).join(', ')}`,
};

export const StatusValidation: EnumValid = {
  IsString: 'Статус пользователя должна быть строкой',
  IsNotEmpty: 'Статус пользователя не может быть пустым',
  IsEnum: `Неверное значение статуса пользователя. Возможны только: ${Object.values(
    statusEnum,
  ).join(', ')}`,
};
