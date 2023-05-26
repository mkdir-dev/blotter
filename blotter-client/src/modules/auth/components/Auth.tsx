import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Paper, Stack, Typography, Link as MuiLink, Button } from '@mui/material';

import { routes } from '@/core/utils/routes';
import logo from '../../../../public/images/logo.png';

export interface AuthProps {
  children?: React.ReactNode;
}

export const Auth = (props: AuthProps) => {
  const { children } = props;

  const router = useRouter();

  return (
    <Box
      width={'100%'}
      maxWidth={'xs'}
      m={'0 auto'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: '420px',
          m: 2,
          px: 2,
          py: 4,
          borderRadius: 4,
        }}
      >
        <Stack alignItems={'center'} pb={4}>
          <Image src={logo} alt={'Logo'} width={50} height={50} />
        </Stack>

        {children}

        <Box mt={1}>
          {router.pathname === routes.signin.path && (
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
              <Typography variant={'body2'} textAlign={'center'}>
                Нет аккаунта?
              </Typography>
              <Link href={routes.signup.path}>
                <Button variant="text">Зарегистрироваться</Button>
              </Link>
            </Box>
          )}

          {router.pathname === routes.signup.path && (
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
              <Typography variant={'body2'} textAlign={'center'}>
                Eсть аккаунт?
              </Typography>
              <Link href={routes.signin.path}>
                <Button variant="text">Войти</Button>
              </Link>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
