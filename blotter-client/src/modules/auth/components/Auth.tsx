import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Paper, Stack, Typography, Link as MuiLink } from '@mui/material';

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
    >
      <Paper elevation={6} sx={{ width: '100%', px: 2, py: 4, borderRadius: 4 }}>
        <Stack alignItems={'center'} pb={4}>
          <Image src={logo} alt={'Logo'} width={50} height={50} />
        </Stack>

        {children}

        <Box mt={1}>
          {router.pathname === routes.signin.path && (
            <Typography variant={'body2'} textAlign={'center'}>
              Нет аккаунта?
              <Link href={routes.signup.path}>
                <MuiLink mx={1}>Регистрация</MuiLink>
              </Link>
            </Typography>
          )}

          {router.pathname === routes.signup.path && (
            <Typography variant={'body2'} textAlign={'center'}>
              Eсть аккаунт?
              <Link href={routes.signin.path}>
                <MuiLink mx={1}>Вход</MuiLink>
              </Link>
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
