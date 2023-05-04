export interface ErrorResponse {
  /*
  statusCode: number;
  message: string | string[];
  error?: string;
  */
  error?: string | null;
  ok: boolean;
  status?: number;
  url: string | null;

  statusCode?: number;
  message?: string | string[];
}
