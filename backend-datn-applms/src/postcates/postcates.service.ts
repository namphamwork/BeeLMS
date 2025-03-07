import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostCateType } from './postcate.model';
import { createResponse } from '../util/util';
import { CreatePostCateDto } from './postcates.dto';

@Injectable()
export class PostCatesService {
  constructor(@InjectModel('PostCate') private readonly postCateModel: Model<PostCateType>) {}

  async getAllPostCates(): Promise<any> {
    try {
      const postCates = await this.postCateModel.find().exec();
      return createResponse(200, 'Success', postCates);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async getPostCateById(id: string): Promise<any> {
    try {
      const postCate = await this.postCateModel.findById(id).exec();
      if (postCate) {
        return createResponse(200, 'Success', postCate);
      } else {
        return createResponse(404, 'PostCate not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async createPostCate(postCate: CreatePostCateDto): Promise<any> {
    try {
      const createdPostCate = new this.postCateModel(postCate);
      await createdPostCate.save();
      return createResponse(201, 'PostCate created', createdPostCate);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async updatePostCate(id: string, postCate: PostCateType): Promise<any> {
    try {
      const updatedPostCate = await this.postCateModel
        .findByIdAndUpdate(id, postCate, { new: true })
        .exec();
      if (updatedPostCate) {
        return createResponse(200, 'PostCate updated', updatedPostCate);
      } else {
        return createResponse(404, 'PostCate not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async deletePostCate(id: string): Promise<any> {
    try {
      const deletedPostCate = await this.postCateModel.findByIdAndDelete(id).exec();
      if (deletedPostCate) {
        return createResponse(200, 'PostCate deleted', deletedPostCate);
      } else {
        return createResponse(404, 'PostCate not found');
      }
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }
}
