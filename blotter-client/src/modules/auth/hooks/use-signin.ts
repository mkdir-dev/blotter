import { useMutation } from 'react-query';
import { signIn as NextSignIn } from 'next-auth/react';

import { SignInParams } from '../utils/auth.validation';
import { SignInHook, AuthHookArgs } from '../types/auth.hook.types';
import { signin } from '@/pages/api/auth/signin';

export const useSignIn = ({ onSuccess, onError }: AuthHookArgs): SignInHook => {
  const { isLoading, error, mutate } = useMutation(
    async (values: SignInParams) => {
      const res = await signin(values);

      if (res.ok) {
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
    handleUseSignIn: mutate,
    isLoadingSignIn: isLoading,
    isErrorSignIn: !!error,
  };
};
