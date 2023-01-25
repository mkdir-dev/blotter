import { EmailValid } from './email-validation.types';

export const EmailValidation: EmailValid = {
  IsString: 'Email должен быть строкой',
  IsNotEmpty: 'Email обязателен для заполнения',
  MinLength: 'Email должен быть не менее 8 символов',
  IsEmail: 'Неверный формат email',
};
