import { z } from 'zod';

export type SignInParams = z.infer<typeof validationSignIn>;
export type SignUpParams = z.infer<typeof validationSignUp>;

export const validationSignIn = z.object({
  password: z
    .string({
      required_error: 'Пароль обязателен для заполнения',
      invalid_type_error: 'Пароль должен быть строкой',
    })
    .min(8, { message: 'Пароль должен быть не менее 8 символов' }),
  email: z
    .string({
      required_error: 'E-mail обязателен для заполнения',
      invalid_type_error: 'E-mail должен быть строкой',
    })
    .min(8, { message: 'E-mail должен быть не менее 8 символов' })
    .email({ message: 'Некорректный e-mail' }),
});

export const validationSignUp = validationSignIn.extend({
  username: z
    .string({
      required_error: 'Логин обязателен для заполнения',
      invalid_type_error: 'Логин должен быть строкой',
    })
    .min(4, { message: 'Логин должен быть не менее 4 символов' })
    .max(40, { message: 'Логин должен быть не более 40 символов' }),
});
