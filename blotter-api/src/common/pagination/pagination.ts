import { BadRequestException } from '@nestjs/common';
import { PaginationParans, Meta } from './pagination.types';

export const handlePagination = (data: PaginationParans): Meta => {
  const { total } = data;

  const page: number = data.page ? parseInt(data.page as string) || 1 : 1;
  let per_page: number = data.per_page
    ? parseInt(data.per_page as string) || 20
    : 20;

  if (per_page <= 20 || per_page > 200) {
    per_page = 20;
  }

  const last_page = Math.ceil(total / per_page);

  if (last_page < page)
    throw new BadRequestException(
      `Старницы ${page} не существует. Всего страниц: ${last_page}`,
    );

  return {
    page,
    last_page,
    per_page,
    total,
  };
};
