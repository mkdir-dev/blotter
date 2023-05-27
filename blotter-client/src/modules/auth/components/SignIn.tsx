import { useState } from 'react';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSnackbar } from 'notistack';

import { routes } from '@/core/utils/routes';
import { Form } from '@/common/form/Form';
import { ControlledInput } from '@/common/form/ControlledInput';
import { ErrorResponse } from '@/common/types/api.types';

import { SignInParams, validationSignIn } from '../utils/auth.validation';
import { formFieldsSignIn } from '../utils/auth.constants';

import { useSignIn } from '../hooks/use-signin';

export const Signin = () => {
  const [textErr, setTextErr] = useState<string | null>(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoadingSignIn, isErrorSignIn, handleUseSignIn } = useSignIn({
    onSuccess: () => {
      enqueueSnackbar('Вход успешно выполнен', { variant: 'success' });

      setTextErr(null);

      router.push(routes.index.path);
    },
    onError: async (err) => {
      const error: ErrorResponse = await err.json();

      if (!!error.message && Array.isArray(error.message)) {
        setTextErr(error.message[0]);

        error.message?.forEach((element) => {
          enqueueSnackbar(element, { variant: 'warning' });
        });
      } else if (!!error.message) {
        setTextErr(error.message);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
  });

  return (
    <Form
      rowGap={3}
      onSubmit={async (data: SignInParams) => handleUseSignIn(data)}
      defaultValues={{ email: '', password: '' }}
      resolver={zodResolver(validationSignIn)}
      submitText={'Войти'}
      isLoading={isLoadingSignIn}
      isError={isErrorSignIn}
      textError={textErr}
    >
      {formFieldsSignIn.map((field) => (
        <ControlledInput key={field.name} disabled={isLoadingSignIn} {...field} />
      ))}
    </Form>
  );
};
