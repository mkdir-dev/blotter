import { z } from 'zod';

export type AuthParams = z.infer<typeof validationAuth>;

export const validationAuth = z.object({
  password: z
    .string({
      required_error: 'Пароль обязательно для заполнения',
      invalid_type_error: 'Пароль должен быть строкой',
    })
    .min(8, { message: 'Пароль должен быть не менее 8 символов' }),
  email: z
    .string({
      required_error: 'E-mail обязательно для заполнения',
      invalid_type_error: 'E-mail должен быть строкой',
    })
    .min(8, { message: 'E-mail должен быть не менее 8 символов' })
    .email({ message: 'Некорректный e-mail' }),
});
