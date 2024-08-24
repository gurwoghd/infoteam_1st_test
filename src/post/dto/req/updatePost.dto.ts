import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNumber()
  postId: number;

  @ApiProperty({
    example: 'new title',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'new content',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    example: 'new tags',
    required: false,
  })
  @IsOptional()
  @IsArray()
  tags: string[];
}
