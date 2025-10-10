
export type urlData={
    url:string,
    userId:string
}
export interface AsyncMessage {
  id: string;
  type: string;
  payload: Record<string, any>;
  createdAt: string;
}