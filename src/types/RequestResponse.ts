export enum RequestType {
  SET_SESSION = 'SET_SESSION',
  REMOVE_SESSION = 'REMOVE_SESSION',
  GENERATE = 'GENERATE',
};

export interface Request {
  type: RequestType;
  data: any | null;
};

export const sendRequest = async (request: Request) => {
  const { data, error } = await chrome.runtime.sendMessage(request);
  
  return { data, error };
};

export interface Response {
  data: any | null;
  error: string | null;
};

export type ResponseCallback = (response: Response) => void;