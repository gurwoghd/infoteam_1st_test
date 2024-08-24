import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/req/createPost.dto';
import { SearchPostDto } from './dto/req/searchPost.dto';
import { UpdatePostDto } from './dto/req/updatePost.dto';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  async create({ title, content, tag }: CreatePostDto, userUuid: string) {
    const tags = [];
    tag.forEach((elem) =>
      tags.push({
        name: elem,
      }),
    );
    console.log(tags);
    return this.prisma.post.create({
      data: {
        title,
        content,
        userUuid,
        Tag: {
          create: tags,
        },
      },
    });
  }

  async getMany({ keyword, tag }: SearchPostDto) {
    return this.prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            content: {
              contains: keyword,
            },
          },
          {
            Tag: {
              some: {
                name: {
                  in: tag,
                },
              },
            },
          },
        ],
      },
    });
  }

  async update({ postId, title, content, tags }: UpdatePostDto) {
    const updateTags = [];
    tags.forEach((elem) => updateTags.push({ name: elem }));
    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
        Tag: {
          update: updateTags,
        },
      },
    });
  }
}
