import { useState } from 'react';

import Head from 'next/head';
import { useSession } from 'next-auth/react';

import { Container, Box } from '@mui/material';

import { Header } from '../components/Header/Header';
import { Navigation } from '../components/Navigation/Navigation';

export interface LayoutProps {
  title?: string;
  children?: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const { title, children } = props;

  const { status } = useSession();
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => setOpenMenu(!openMenu);

  return (
    <>
      <Head>
        <title>{title ? `${title} | Blotter` : 'Blotter'}</title>
      </Head>

      <Container
        maxWidth={'xl'}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          px: {
            xs: 0,
          },
        }}
      >
        <Header openMenu={openMenu} handleOpenMenu={handleOpenMenu} />

        <Box component={'main'} display={'flex'} flex={'1 0 auto'}>
          {status !== 'authenticated' ? (
            <Box width={'100%'} p={'16px'}>
              {children}
            </Box>
          ) : (
            <>
              <Navigation openMenu={openMenu} />
              <Box p={'16px'}>{children}</Box>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};
