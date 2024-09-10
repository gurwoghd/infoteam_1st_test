import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

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
  @Transform(({value}) => {
    if(typeof value === "string") return [value]
    return value;
  })
  tag: CreateTagDto[];
}
