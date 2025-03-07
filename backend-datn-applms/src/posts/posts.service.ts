import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostType } from './post.model';
import { createResponse } from '../util/util';
import { CreatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<PostType>) {}

  async getAllPosts(): Promise<any> {
    try {
      const posts = await this.postModel.find().exec();
      return createResponse(200, 'Success', posts);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getPostById(id: string): Promise<any> {
    try {
      const post = await this.postModel.findById(id).exec();
      if (post) {
        return createResponse(200, 'Success', post);
      } else {
        return createResponse(404, 'Post not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createPost(post: CreatePostDto): Promise<any> {
    try {
      const createdPost = new this.postModel(post);
      await createdPost.save();
      return createResponse(201, 'Post created', createdPost);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updatePost(id: string, post: PostType): Promise<any> {
    try {
      const updatedPost = await this.postModel
        .findByIdAndUpdate(id, post, { new: true })
        .exec();
      if (updatedPost) {
        return createResponse(200, 'Post updated', updatedPost);
      } else {
        return createResponse(404, 'Post not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deletePost(id: string): Promise<any> {
    try {
      const deletedPost = await this.postModel.findByIdAndDelete(id).exec();
      if (deletedPost) {
        return createResponse(200, 'Post deleted', deletedPost);
      } else {
        return createResponse(404, 'Post not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}
