import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty()
  @IsArray({ message: 'Передан неверный формат данных' })
  ids: string[];
}
