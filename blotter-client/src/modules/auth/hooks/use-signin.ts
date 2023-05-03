import { useMutation } from 'react-query';
import { signIn as NextSignIn } from 'next-auth/react';

import { AuthParams } from '../utils/auth.validation';
import { AuthHook, AuthHookArgs } from './authhook.types';

export const useSignIn = ({ onSuccess, onError }: AuthHookArgs): AuthHook => {
  const { isLoading, error, mutate } = useMutation(
    async (values: AuthParams) => {
      const signInResponse = await NextSignIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (signInResponse?.error) {
        return Promise.reject(signInResponse);
      }

      return signInResponse;
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
