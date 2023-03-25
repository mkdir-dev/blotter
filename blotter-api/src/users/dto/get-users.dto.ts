import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { Meta } from 'src/common/pagination/pagination.types';
import { IdValidation } from 'src/common/validation/general/id/id-validation';

export class GetUserByIdDto {
  @ApiProperty()
  @IsString({ message: IdValidation.IsString })
  @Length(24, 24, { message: IdValidation.Length })
  readonly id: string;
}

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

export class ResponseGetUser {
  readonly id: string;
  readonly uuid: string;
  readonly username: string;
  readonly email: string;
  readonly name: string | null;
  readonly surname: string | null;
  readonly birthday: number | null;
  readonly avatar: string | null;
  readonly phone: number | null;
  readonly nationality: string | null;
  readonly country: string | null;
  readonly city: string | null;
  readonly gender: 'male' | 'female' | 'non-binary' | null;
  readonly createdAt: number | null;
  readonly updatedAt: number | null;
  readonly role: string[];
  readonly status: string;
}

export class ResponseGetUsersPagination {
  meta: Meta;
  data: ResponseGetUser[];
}
