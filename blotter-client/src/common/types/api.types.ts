export interface ErrorResponse {
  ok: boolean;
  status?: number;
  url: string | null;

  statusCode?: number;
  message?: string | string[];
  error?: string | null;
}

export interface Meta {
  page: number;
  per_page: number;
  total: number;
  last_page: number;
}
