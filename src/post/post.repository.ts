import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/req/createPost.dto';
import { SearchPostDto } from './dto/req/searchPost.dto';
import { UpdatePostDto } from './dto/req/updatePost.dto';
import { UpdateTagDto } from './dto/req/updateTag.dto';
import { DeletePostDto } from './dto/req/deletePost.dto';

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
    const updateTags: UpdateTagDto[] = [];
    tags.forEach((elem) => updateTags.push({ postId, name: elem }));

    const deleteTag = this.prisma.tag.deleteMany({
      where: {
        postId,
      },
    });

    const createTag = this.prisma.tag.createMany({
      data: updateTags,
    });

    const updatePost = this.prisma.post.update({
      where: {
        id: postId,
      },

      data: {
        title,
        content,
      },
    });

    return this.prisma
      .$transaction([deleteTag, createTag, updatePost])
      .catch((err) => {
        throw new Error(err);
      });
  }

  async delete({ postId }: DeletePostDto) {
    const deletePost = this.prisma.post.delete({
      where: {
        id: postId,
      },
    });

    const deleteTag = this.prisma.tag.deleteMany({
      where: {
        postId: postId,
      },
    });

    return this.prisma.$transaction([deletePost, deleteTag]).catch((err) => {
      throw new Error(err);
    });
  }
}
