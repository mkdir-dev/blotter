import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { IdValidation } from 'src/common/validation/general/id/id-validation';

export class GetUserByIdDto {
  @ApiProperty()
  @IsString({ message: IdValidation.IsString })
  @Length(24, 24, { message: IdValidation.Length })
  readonly id: string;
}

export class ResponseGetUserByIdDto {
  readonly id: string;
  readonly uuid: string;
  readonly username: string;
  readonly email: string;
  readonly name: string | null;
  readonly surname: string | null;
  readonly birthday: number | null;
  readonly avatar: string | null;
  readonly phone: number | null;
  readonly country: string | null;
  readonly city: string | null;
  readonly gender: 'male' | 'female' | 'non-binary' | null;
  readonly createdAt: number | null;
  readonly updatedAt: number | null;
  readonly role: string[];
  readonly status: string;
}
