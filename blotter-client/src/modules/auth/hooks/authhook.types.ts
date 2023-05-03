import { UseMutateFunction } from 'react-query';
import { JwtPayload } from 'jwt-decode';

import { AuthParams } from '../utils/auth.validation';

export interface AuthHookArgs {
  onSuccess: () => void; //  (value: TokensResponse) => void;
  onError: (err: any) => void;
}

export interface AuthHook {
  handleUseAuth: UseMutateFunction<any, unknown, AuthParams, unknown>;
  isLoadingAuth: boolean;
  isErrorAuth: boolean;
}

export interface TokensResponse {
  access_token: string;
  refresh_token: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
}

/*
export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

{ 
    sub: "6420b46fae20a7b24f170fa9", 
    username: "mike", 
    email: "mike@mail.com", 
    role: "admin", 
    iat: 1683094140, 
    exp: 1683097740 
}
*/

export enum roleEnum {
  user = 'user',
  admin = 'admin',
}

export interface JwtPayloadResponse extends JwtPayload {
  username: string;
  email: string;
  role: roleEnum;
}
