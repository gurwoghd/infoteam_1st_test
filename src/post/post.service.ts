import { Injectable, Post, Query } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePostDto } from './dto/req/createPost.dto';

@Injectable('post')
export class PostService {
  constructor(private postRepository: PostRepository) {}

  @ApiOperation({
    summary: 'create a post',
  })
  @Post('create')
  async createPost(@Query() query: CreatePostDto) {
    return this.postRepository.create(query);
  }
}
