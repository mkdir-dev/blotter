import { UseMutateFunction } from 'react-query';
import { AuthParams } from '../utils/auth.validation';

export interface AuthHookArgs {
  onSuccess: (value: SignInSuccessResponse) => void;
  onError: (err: any) => void;
}

export interface AuthHook {
  handleUseAuth: UseMutateFunction<any, unknown, AuthParams, unknown>;
  isLoadingAuth: boolean;
  isErrorAuth: boolean;
}

export interface SignInSuccessResponse {
  access_token: string;
  refresh_token: string;
}
