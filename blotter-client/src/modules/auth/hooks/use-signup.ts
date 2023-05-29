import { useMutation } from 'react-query';

import { signup } from '@/pages/api/auth/signup';
import { SignUpParams } from '../utils/auth.validation';
import { SignUpHook, SignUpHookArgs, SignUpResponse } from '../types/auth.hook.types';

export const useSignUp = ({ onSuccess, onError }: SignUpHookArgs): SignUpHook => {
  const { isLoading, error, mutate } = useMutation(
    async (values: SignUpParams) => {
      const res = await signup(values);

      if (res.ok) {
        const result: SignUpResponse = await res.json();

        return result;
      }

      return Promise.reject(res);
    },
    {
      onSuccess,
      onError,
    }
  );

  return {
    handleUseSignUp: mutate,
    isLoadingSignUp: isLoading,
    isErrorSignUp: !!error,
  };
};
