import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResultVideo } from './resultVideo.model';
import { createResponse } from '../util/util';
import { CheckResultVideoDto, SaveResultVideoDto } from './resultVideos.dto';
import { User } from 'src/users/user.model';

@Injectable()
export class ResultVideosService {
  constructor(@InjectModel('ResultVideo') private readonly resultVideoModel: Model<ResultVideo>) { }

  // async getAllResultVideos(): Promise<any> {
  //   try {
  //     const resultVideos = await this.resultVideoModel.find().exec();
  //     return createResponse(200, 'Success', resultVideos);
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }

  // async getResultVideoById(id: string): Promise<any> {
  //   try {
  //     const resultVideo = await this.resultVideoModel.findById(id).exec();
  //     if (resultVideo) {
  //       return createResponse(200, 'Success', resultVideo);
  //     } else {
  //       return createResponse(404, 'ResultVideo not found');
  //     }
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }

  async createResultVideo(resultVideo: ResultVideo): Promise<any> {
    try {
      const createdResultVideo = new this.resultVideoModel(resultVideo);
      await createdResultVideo.save();
      return createResponse(201, 'ResultVideo created', createdResultVideo);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async saveResultVideo(user: User, resultVideo: SaveResultVideoDto): Promise<any> {
    resultVideo.learner = user.id;
    const {course, learner, video} = resultVideo;
    try {
      const check = await this.resultVideoModel.find({course, learner, video}).exec();
      if (check.length == 0) {
        const createdResultVideo = new this.resultVideoModel(resultVideo);
        await createdResultVideo.save();
      }
      return createResponse(201, 'ResultVideo saved');
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  async checkResultVideo(user: User, resultVideo: CheckResultVideoDto): Promise<any> {
    const { id } = user;
    resultVideo.learner = id;

    try {
      const resultVideos = await this.resultVideoModel.find({
        learner: resultVideo.learner,
        course: resultVideo.course
      }).exec();
      const data = resultVideos.map(r => r.video);
      
      return createResponse(200, 'Success', data);
    } catch (error) {
      return createResponse(500, 'Internal Server Error', error.message);
    }
  }

  // async updateResultVideo(id: string, resultVideo: ResultVideo): Promise<any> {
  //   try {
  //     const updatedResultVideo = await this.resultVideoModel
  //       .findByIdAndUpdate(id, resultVideo, { new: true })
  //       .exec();
  //     if (updatedResultVideo) {
  //       return createResponse(200, 'ResultVideo updated', updatedResultVideo);
  //     } else {
  //       return createResponse(404, 'ResultVideo not found');
  //     }
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }

  // async deleteResultVideo(id: string): Promise<any> {
  //   try {
  //     const deletedResultVideo = await this.resultVideoModel.findByIdAndDelete(id).exec();
  //     if (deletedResultVideo) {
  //       return createResponse(200, 'ResultVideo deleted', deletedResultVideo);
  //     } else {
  //       return createResponse(404, 'ResultVideo not found');
  //     }
  //   } catch (error) {
  //     return createResponse(500, 'Internal Server Error', error.message);
  //   }
  // }
}
