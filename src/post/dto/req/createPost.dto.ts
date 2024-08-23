import { ApiProperty } from '@nestjs/swagger';

class CreateTagDto {
  @ApiProperty()
  name: string;
}

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty({
    type: [() => CreateTagDto],
  })
  tag: CreateTagDto[];
}
