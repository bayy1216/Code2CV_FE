export interface ApiResponse<T> {
  result: 'SUCCESS' | 'FAIL';
  data: T;
  message: string;
  errorCode: string;
}

export interface PagingRequest {
  cursor?: number;
  size: number;
}

export interface PagingResponse<T> {
  hasNext: boolean;
  data: T[];
}