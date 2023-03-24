import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { IdValidation } from 'src/common/validation/general/id/id-validation';

export class GetUserByIdDto {
  @ApiProperty()
  @IsString({ message: IdValidation.IsString })
  @Length(24, 24, { message: IdValidation.Length })
  readonly id: string;
}
