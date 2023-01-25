import { ServerErr } from './server-errors.types';

export const ServerError: ServerErr = {
  NotFoundError: 'Запрашиваемый ресурс не найден',
  InternalServerError: 'Ошибка сервера. Ошибка по-умолчанию',
  ServerError: 'На сервере произошла ошибка',
};
