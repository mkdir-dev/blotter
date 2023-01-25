import { UsernameValid } from './username-validation.types';

export const UsernameValidation: UsernameValid = {
  IsString: 'Логин должен быть строкой',
  IsNotEmpty: 'Логин обязателен для заполнения',
  MinLength: 'Логин должен быть не менее 4 символов',
  MaxLength: 'Логин должен быть не более 40 символов',
};
