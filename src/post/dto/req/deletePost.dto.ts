import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeletePostDto {
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  postId: number;
}
