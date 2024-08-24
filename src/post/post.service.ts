import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/req/createPost.dto';
import { SearchPostDto } from './dto/req/searchPost.dto';
import { UpdatePostDto } from './dto/req/updatePost.dto';
import { DeletePostDto } from './dto/req/deletePost.dto';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async createPost(query: CreatePostDto, user: any) {
    return this.postRepository.create(query, user.userUuid);
  }

  async searchPost(query: SearchPostDto) {
    return this.postRepository.getMany(query);
  }

  async updatePost(query: UpdatePostDto) {
    return this.postRepository.update(query);
  }

  async deletePost(query: DeletePostDto) {
    return this.postRepository.delete(query);
  }
}
