import { useMutation } from 'react-query';

import { AuthParams } from '../utils/auth.validation';
import { AuthHook, AuthHookArgs, SignInSuccessResponse } from './authhook.types';
import { signin } from '@/pages/api/auth/signin';

export const useSignIn = ({ onSuccess, onError }: AuthHookArgs): AuthHook => {
  const { isLoading, error, mutate } = useMutation(
    async (values: AuthParams) => {
      const res = await signin(values);

      if (res.ok) {
        const result: SignInSuccessResponse = await res.json();

        return result;
      }

      return await Promise.reject(res);
    },
    {
      onSuccess,
      onError,
    }
  );

  return {
    handleUseAuth: mutate,
    isLoadingAuth: isLoading,
    isErrorAuth: !!error,
  };
};
