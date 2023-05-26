import { UseMutateFunction } from 'react-query';
import { JwtPayload } from 'jwt-decode';

import { SignInParams, SignUpParams } from '../utils/auth.validation';

export interface AuthHookArgs {
  onSuccess: () => void;
  onError: (err: Response) => void;
}

export interface SignUpHookArgs {
  onSuccess: (value: SignUpResponse) => void;
  onError: (err: Response) => void;
}

export interface SignInHook {
  handleUseSignIn: UseMutateFunction<any, unknown, SignInParams, unknown>;
  isLoadingSignIn: boolean;
  isErrorSignIn: boolean;
}

export interface SignUpHook {
  handleUseSignUp: UseMutateFunction<any, unknown, SignUpParams, unknown>;
  isLoadingSignUp: boolean;
  isErrorSignUp: boolean;
}

export interface LogoutHook {
  handleUseLogout: UseMutateFunction<any, unknown, string, unknown>;
  isLoadingLogout: boolean;
  isErrorLogout: boolean;
}

export interface TokensResponse {
  access_token: string;
  refresh_token: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
}

export interface SignUpResponse {
  id: string;
  uuid: string;
  username: string;
  email: string;
  role: roleEnum;
}

export enum roleEnum {
  user = 'user',
  admin = 'admin',
}

export interface JwtPayloadResponse extends JwtPayload {
  username: string;
  email: string;
  role: roleEnum;
}
