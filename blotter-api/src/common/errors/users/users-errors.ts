import { UserErr } from './users-errors.types';

export const UserError: UserErr = {
  BadRequestError: 'Переданы некорректные данные пользователя',
  ValidationError: 'Ошибка валидации при создании пользователя',
  NotFoundError: 'Запрашиваемый пользователь не найден',
  ConflictError: 'Пользователь с таким Логином или Email уже зарегистрирован',
};
