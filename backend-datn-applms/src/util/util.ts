export const createResponse = (
  statusCode: number,
  message: string,
  data?: any,
): Partial<{ statusCode: number; message: string; data?: any }> => {
  const response: Partial<{ statusCode: number; message: string; data?: any }> =
    { statusCode, message };
  if (data) {
    response.data = data;
  }
  return response;
};
