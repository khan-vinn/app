import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PostCreateDto } from './dto/postCreate.dto';
import { PostUpdateDto } from './dto/postUpdate.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async findAll(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }

  async findOne(id: number) {
    return await this.postRepository.findOne(id);
  }

  async createOne(createPostDto: PostCreateDto) {
    return await this.postRepository.create(createPostDto);
  }

  async deleteOne(id: number) {
    return await this.postRepository.delete(id);
  }

  async updateOne(
    id: number,
    updatePostDto: PostUpdateDto,
  ): Promise<PostEntity> {
    const post = await this.postRepository.findOne(id);

    if (!post) {
      throw new HttpException('post not found', HttpStatus.BAD_REQUEST);
    }

    Object.assign(post, updatePostDto);

    return await this.postRepository.save(post);
  }
}
