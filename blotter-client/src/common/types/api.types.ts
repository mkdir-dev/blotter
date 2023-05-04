export interface ErrorResponse {
  ok: boolean;
  status?: number;
  url: string | null;

  statusCode?: number;
  message?: string | string[];
  error?: string | null;
}
