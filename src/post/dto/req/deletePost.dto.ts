import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeletePostDto {
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  @Transform(({value}) => {
    return parseInt(value);
  })
  postId: number;
}
