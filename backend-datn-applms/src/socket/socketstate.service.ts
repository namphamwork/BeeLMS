import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.model';

@Injectable()
export class SocketStateService {
  private readonly onlineUsers = new Set<string>();
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) { }
  async markUserOnline(userId: string) {
    this.onlineUsers.add(userId);
    await this.userModel.updateOne({ _id: userId }, { isOnline: true });
  }

  async markUserOffline(userId: string) {
    this.onlineUsers.delete(userId);
    await this.userModel.updateOne({ _id: userId }, { isOnline: false });
  }

  isUserOnline(userId: string) {
    return this.onlineUsers.has(userId);
  }
}

