export interface UsersResponse {
  data: User[];
  statusCode: number;
  messages: string;
}
export interface UserResponse {
  data: User;
  statusCode: number;
  messages: string;
}

export type User = {
  _id?: string;
  code?: string;
  username?: string;
  fullname?: string;
  phone?: string;
  address?: string;
  email?: string;
  password?: string;
  refresh_token?: string;
  role?: string;
  avatar?: string;
};
export type UserInfo = {
  _id?: string;
  code: string;
  username: string;
  fullname: string;
  phone: string;
  address: string;
  email: string;
  role: string;
  avatar: string;
};
