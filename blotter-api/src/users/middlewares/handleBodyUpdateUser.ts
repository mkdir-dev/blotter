import { BadRequestException } from '@nestjs/common';

import { UpdateUserDto } from '../dto/update-user.dto';

export const handleUpdateUserRoute = (data: UpdateUserDto) => {
  if (Object.entries(data).length === 0) {
    throw new BadRequestException('Нет данных для редактирования пользователя');
  }

  const keyParams = [
    'username',
    'email',
    'name',
    'surname',
    'birthday',
    'phone',
    'nationality',
    'country',
    'city',
    'gender',
    'role',
    'status',
  ];
  const errKey: string[] = [];

  for (const key in data) {
    const exist = keyParams.some((param) => param === key);

    if (!exist) errKey.push(key);
  }

  if (errKey.length > 0) {
    throw new BadRequestException(
      `Недопустимые параметры редактирования: ${errKey.join(', ')}`,
    );
  }
};
