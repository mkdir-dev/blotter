import { useState } from 'react';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSnackbar } from 'notistack';

import { routes } from '@/core/utils/routes';
import { Form } from '@/common/form/Form';
import { ControlledInput } from '@/common/form/ControlledInput';
import { ErrorResponse } from '@/common/types/api.types';
import { SignUpParams, validationSignUp } from '@/modules/auth/utils/auth.validation';

import { formFieldsSignUp } from '../utils/auth.constants';
import { useSignUp } from '../hooks/use-signup';

export const SignUp = () => {
  const [textErr, setTextErr] = useState<string | null>(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoadingSignUp, isErrorSignUp, handleUseSignUp } = useSignUp({
    onSuccess: async (res) => {
      enqueueSnackbar(`Пользователь ${res.username} успешно создан`, { variant: 'success' });

      setTextErr(null);

      router.push(routes.signin.path);
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
      onSubmit={async (data: SignUpParams) => handleUseSignUp(data)}
      defaultValues={{ email: '', username: '', password: '' }}
      resolver={zodResolver(validationSignUp)}
      submitText={'Sign up'}
      isLoading={isLoadingSignUp}
      isError={isErrorSignUp}
      textError={textErr}
    >
      {formFieldsSignUp.map((field) => (
        <ControlledInput key={field.name} disabled={isLoadingSignUp} {...field} />
      ))}
    </Form>
  );
};
