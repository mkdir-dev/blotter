import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { Box, Paper, Stack } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSnackbar } from 'notistack';

import { routes } from '@/core/utils/routes';
import { Form } from '@/common/form/Form';
import { ControlledInput } from '@/common/form/ControlledInput';
import { ErrorResponse } from '@/common/types/api.types';

import { AuthParams, validationAuth } from '../utils/auth.validation';
import { formFieldsAuth } from '../utils/auth.constants';
import logo from '../../../../public/images/logo.png';

import { useSignIn } from '../hooks/use-signin';

export const Signin = () => {
  const [textErr, setTextErr] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoadingAuth, isErrorAuth, handleUseAuth } = useSignIn({
    onSuccess: async () => {
      enqueueSnackbar('Вход успешно выполнен', { variant: 'success' });

      if (session?.user?.name)
        enqueueSnackbar(`Добро пожаловать, ${session.user.name}`, { variant: 'info' });

      setTextErr(null);

      router.push(routes.index.path);
    },
    onError: async (err: Response) => {
      const error: ErrorResponse = await err.json();

      if (!!error.message && Array.isArray(error.message)) {
        // @ts-ignore
        setTextErr(error.message[0]);

        // @ts-ignore
        error.message?.forEach((element) => {
          enqueueSnackbar(element, { variant: 'warning' });
        });
      } else if (!!error.message) {
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
          isLoading={isLoadingAuth || status === 'loading'}
          isError={isErrorAuth}
          textError={textErr}
        >
          {formFieldsAuth.map((field) => (
            <ControlledInput
              key={field.name}
              disabled={isLoadingAuth || status === 'loading'}
              {...field}
            />
          ))}
        </Form>
      </Paper>
    </Box>
  );
};
