export type ErrorResponse = {
  data: string;
  status: number;
  statusText: string;
  errors?: Record<string, string[]>;
};