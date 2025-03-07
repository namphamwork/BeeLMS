export type LoginResponse = {
  data: {
    access_token: string;
    refresh_token: string;
  };
  statusCode: number;
  message: string;
};
