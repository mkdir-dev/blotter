import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { IdValidation } from 'src/common/validation/general/general-validation';
import { genderEnum } from '../enums/gender.enum';
import { roleEnum } from '../enums/role.enum';
import { statusEnum } from '../enums/status.enum';

export class FindUserByIdDto {
  @ApiProperty()
  @IsString({ message: IdValidation.IsString })
  @Length(24, 24, { message: IdValidation.Length })
  readonly id: string;
}

export class ResponseUser {
  readonly id: string;
  readonly uuid: string;
  readonly username: string;
  readonly email: string;
  readonly name: string | null;
  readonly surname: string | null;
  readonly birthday: number | null;
  readonly avatar: string | null;
  readonly phone: string | null;
  readonly nationality: string | null;
  readonly country: string | null;
  readonly city: string | null;
  readonly gender: genderEnum | null;
  readonly createdAt: number | null;
  readonly updatedAt: number | null;
  readonly role: roleEnum;
  readonly status: statusEnum;
}
