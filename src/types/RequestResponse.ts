export enum RequestType {
  SET_SESSION = 'SET_SESSION',
  REMOVE_SESSION = 'REMOVE_SESSION',
  CHECK_EXISTS = 'CHECK_EXISTS',
  GENERATE = 'GENERATE',
};

export type Request = {
  type: RequestType;
  data: any | null;
};

export const sendRequest = async (request: Request) => {
  const response = await chrome.runtime.sendMessage(request);

  return response;
};

export type Response = {
  data: any | null;
  error: string | null;
};

export type ResponseCallback = (response: Response) => void;