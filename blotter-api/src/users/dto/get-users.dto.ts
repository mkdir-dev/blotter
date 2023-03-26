import { ApiProperty } from '@nestjs/swagger';
import { Meta } from 'src/common/pagination/pagination.types';
import { ResponseUser } from './general-user.dto';

export class GetUsersQueryParamsDto {
  @ApiProperty({ required: false })
  readonly search?: string;

  @ApiProperty({ required: false })
  readonly sort?: string;

  @ApiProperty({ required: false })
  readonly page?: string;

  @ApiProperty({ required: false })
  readonly per_page?: string;
}

export class ResponseUsersPagination {
  meta: Meta;
  data: ResponseUser[];
}
