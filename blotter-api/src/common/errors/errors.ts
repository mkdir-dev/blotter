import { ServerErr, AuthErr, RoleErr, UserErr, FileErr } from './errors.types';

export const ServerError: ServerErr = {
  NotFoundError: 'Запрашиваемый ресурс не найден.',
  InternalServerError: 'Ошибка сервера. Ошибка по-умолчанию.',
  ServerError: 'На сервере произошла ошибка.',
  SaveFileError: 'Ошибка сохранения файла.',
};

export const AuthError: AuthErr = {
  UnauthorizedError: 'Ошибка аутентификации.',
  AuthRequired: 'Необходима авторизация.',
  UserUnauthError: 'Неверные почта или пароль.',
  TokenInternalServerError: 'Ошибка при создании или проверкe токена.',
};

export const RoleError: RoleErr = {
  ForbiddenError: 'Запрещенный запрос. Недостаточно прав.',
};

export const UserError: UserErr = {
  BadRequestError: 'Переданы некорректные данные пользователя.',
  ValidationError: 'Ошибка валидации при создании/редактировании пользователя.',
  NotFoundError: 'Запрашиваемый пользователь не найден.',
  ConflictError: 'Пользователь с таким Логином или Email уже зарегистрирован.',
};

export const FileError: FileErr = {
  BadRequestError: 'Переданы некорректные данные файла.',
};
