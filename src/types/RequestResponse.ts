export enum RequestType {
  RENDER_CHECKS = 'RENDER_CHECKS',
  GENERATE = 'GENERATE',
}

export type Request = {
  type: RequestType;
  data: any | null;
};

export const sendRequest = async (request: Request): Promise<Response> => {
  const response = await chrome.runtime.sendMessage(request);

  return response;
};

export enum ResponseErrorType {
  NO_USER = 'NO_USER',
  NO_QUERIES = 'NO_QUERIES',
  MESSAGE_ERROR = 'MESSAGE_ERROR',
}

export type ResponseError = {
  type: ResponseErrorType;
  message?: string;
};

export type Response = {
  data: any | null;
  error: ResponseError | null;
};

export type ResponseCallback = (response: Response) => void;
