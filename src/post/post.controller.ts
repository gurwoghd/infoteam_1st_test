import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/req/createPost.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SearchPostDto } from './dto/req/searchPost.dto';
import { UpdatePostDto } from './dto/req/updatePost.dto';
import { DeletePostDto } from './dto/req/deletePost.dto';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    summary: 'create post',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createPost(@Query() query: CreatePostDto, @Req() req: any) {
    return this.postService.createPost(query, req.user);
  }

  @ApiOperation({
    summary: 'search post',
    description:
      'if keyword given, then search post containing the keyword within their title or content, if tag given, then search posts containing the tag',
  })
  @Get('search')
  async searchPost(@Query() query: SearchPostDto) {
    return this.postService.searchPost(query);
  }

  @ApiOperation({
    summary: 'update post',
    description: 'update if new title or new content or new tags are given',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Patch('')
  async updatePost(@Query() query: UpdatePostDto) {
    return this.postService.updatePost(query);
  }

  @ApiOperation({
    summary: 'delete post',
    description: 'delete post whose id is the same with the given postId',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deletePost(@Query() query: DeletePostDto) {
    return this.postService.deletePost(query);
  }
}
