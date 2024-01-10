export interface ApiResponse<T> {
  data: T;
  request: {
    status: number;
    statusText: string;
  };
}
