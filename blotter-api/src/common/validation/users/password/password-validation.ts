import { PasswordValid } from './password-validation.types';

export const PasswordValidation: PasswordValid = {
  IsString: 'Пароль должен быть строкой',
  IsNotEmpty: 'Пароль обязателен для заполнения',
  MinLength: 'Пароль должен быть не менее 8 символов',
};
