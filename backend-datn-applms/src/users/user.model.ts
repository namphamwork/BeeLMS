import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleUser } from 'src/config/constants';

export interface User extends Document {
  _id: string;
  code: string;
  username: string;
  fullname: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  refresh_token: string;
  role: string;
  avatar: string;
  isDelete: boolean;
  isOnline: boolean;
  comparePassword(password: string): Promise<boolean>;
}

export const UserSchema = new Schema<User>(
  {
    code: { type: String, required: false, default: '' },
    username: { type: String, required: true },
    fullname: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    address: { type: String, required: false, default: '' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    refresh_token: { type: String, required: false, default: '' },
    role: {
      type: String,
      enum: [
        RoleUser.ADMIN,
        RoleUser.SUBADMIN,
        RoleUser.INSTRUCTOR,
        RoleUser.LEARNER,
      ],
      default: 'learner',
      required: true,
    },
    avatar: { type: String, required: false, default: 'avatar.png' },
    isDelete: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false }
  },
  { timestamps: true },
);

UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  const user = this as User;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
};

export const UserModel = MongooseModule.forFeature([
  { name: 'User', schema: UserSchema },
]);
