export interface ServerErr {
  NotFoundError: string;
  InternalServerError: string;
  ServerError: string;
  SaveFileError: string;
}

export interface AuthErr {
  UnauthorizedError: string;
  AuthRequired: string;
  UserUnauthError: string;
}

export interface UserErr {
  BadRequestError: string;
  ValidationError: string;
  NotFoundError: string;
  ConflictError: string;
}

export interface FileErr {
  BadRequestError: string;
}
