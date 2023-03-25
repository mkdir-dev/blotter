export interface PaginationParams {
  page?: string;
  per_page?: string;
  total: number;
}

export interface Meta {
  page: number;
  per_page: number;
  total: number;
  last_page: number;
}
