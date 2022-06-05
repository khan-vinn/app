import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { PostCreateDto } from './dto/postCreate.dto';
import { PostUpdateDto } from './dto/postUpdate.dto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  async findAll(): Promise<PostEntity[]> {
    return await this.postService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.findOne(id);
  }

  @Post()
  async createOne(@Body(new ValidationPipe()) createPostDto: PostCreateDto) {
    return await this.postService.createOne(createPostDto);
  }

  @Delete()
  async deleteOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.postService.deleteOne(id);
  }

  @Put()
  async updateOne(
    id: number,
    updatePostDto: PostUpdateDto,
  ): Promise<PostEntity> {
    return await this.postService.updateOne(id, updatePostDto);
  }
}
