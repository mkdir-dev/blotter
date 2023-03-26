import { BadRequestException } from '@nestjs/common';

import { UpdateUserDto } from '../dto/update-user.dto';
import { valuesUpdateUsers } from '../utils/constants';

export const handleUpdateUserRoute = (data: UpdateUserDto) => {
  if (Object.entries(data).length === 0) {
    throw new BadRequestException('Нет данных для редактирования пользователя');
  }

  const errKey: string[] = [];

  for (const key in data) {
    const exist = valuesUpdateUsers.some((param) => param === key);

    if (!exist) errKey.push(key);
  }

  if (errKey.length > 0) {
    throw new BadRequestException(
      `Недопустимые параметры редактирования: ${errKey.join(', ')}`,
    );
  }
};
