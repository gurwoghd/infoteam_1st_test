import { ApiProperty } from '@nestjs/swagger';

export class SearchPostDto {
  @ApiProperty({
    required: false,
  })
  keyword?: string;

  @ApiProperty({
    required: false,
  })
  tag: { name: string }[];
}
