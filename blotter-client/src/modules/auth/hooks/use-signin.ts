import { useMutation } from 'react-query';
import { signIn as NextSignIn } from 'next-auth/react';

import { AuthParams } from '../utils/auth.validation';
import { AuthHook, AuthHookArgs } from './authhook.types';
import { signin } from '@/pages/api/auth/signin';

export const useSignIn = ({ onSuccess, onError }: AuthHookArgs): AuthHook => {
  const { isLoading, error, mutate } = useMutation(
    async (values: AuthParams) => {
      const res = await signin(values);

      if (res.ok) {
        // const result: TokensResponse = await res.json();

        const signInResponse = await NextSignIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (signInResponse?.error) {
          return await Promise.reject(signInResponse);
        }

        return signInResponse;
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
