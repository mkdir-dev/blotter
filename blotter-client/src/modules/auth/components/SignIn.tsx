import Image from 'next/image';

import { Box, Paper, Stack } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSnackbar } from 'notistack';

import { Form } from '@/common/form/Form';
import { ControlledInput } from '@/common/form/ControlledInput';
import { ErrorResponse } from '@/common/types/api.types';

import { AuthParams, validationAuth } from '../utils/auth.validation';
import { formFieldsAuth } from '../utils/auth.constants';
import logo from '../../../../public/images/logo.png';

import { useSignIn } from '../hooks/use-signin';
import { useState } from 'react';

export const Signin = () => {
  const [textErr, setTextErr] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const { isLoadingAuth, isErrorAuth, handleUseAuth } = useSignIn({
    onSuccess: (val) => {
      console.log('val', val);

      enqueueSnackbar('Вход успешно выполнен', { variant: 'success' });
      setTextErr(null);
    },
    onError: async (err: Response) => {
      const error: ErrorResponse = await err.json();

      if (Array.isArray(error.message)) {
        // @ts-ignore
        setTextErr(error.message[0]);

        // @ts-ignore
        error.message?.forEach((element) => {
          enqueueSnackbar(element, { variant: 'warning' });
        });
      } else {
        // @ts-ignore
        setTextErr(error.message);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
  });

  return (
    <Box
      width={'100%'}
      maxWidth={'xs'}
      m={'0 auto'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
    >
      <Paper elevation={6} sx={{ width: '100%', px: 2, py: 4, borderRadius: 4 }}>
        <Stack alignItems={'center'} pb={4}>
          <Image src={logo} alt={'Logo'} width={50} height={50} />
        </Stack>

        <Form
          rowGap={3}
          onSubmit={async (data: AuthParams) => handleUseAuth(data)}
          defaultValues={{ email: '', password: '' }}
          resolver={zodResolver(validationAuth)}
          submitText={'Sign in'}
          isLoading={isLoadingAuth}
          isError={isErrorAuth}
          textError={textErr}
        >
          {formFieldsAuth.map((field) => (
            <ControlledInput key={field.name} disabled={isLoadingAuth} {...field} />
          ))}
        </Form>
      </Paper>
    </Box>
  );
};
