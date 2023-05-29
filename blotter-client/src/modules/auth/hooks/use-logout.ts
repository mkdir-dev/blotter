import { signOut } from 'next-auth/react';
import { useMutation } from 'react-query';

import { logout } from '@/pages/api/auth/logout';
import { AuthHookArgs, LogoutHook } from '../types/auth.hook.types';

export const useLogout = ({ onError }: AuthHookArgs): LogoutHook => {
  const { isLoading, error, mutate } = useMutation(
    async (token: string) => {
      const res = await logout(token);

      if (res.ok) {
        // await signOut({ callbackUrl: '/' });
        await signOut();

        return;
      }

      return Promise.reject(res);
    },
    {
      onError,
    }
  );

  return {
    handleUseLogout: mutate,
    isLoadingLogout: isLoading,
    isErrorLogout: !!error,
  };
};
