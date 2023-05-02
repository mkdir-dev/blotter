import { useState } from 'react';

import Head from 'next/head';

import { Container, Box } from '@mui/material';

import { Header } from '../components/Header/Header';
import { Navigation } from '../components/Navigation/Navigation';

export interface LayoutProps {
  authPage?: boolean;
  title?: string;
  children?: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const { authPage, title, children } = props;

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
        }}
      >
        <Header openMenu={openMenu} authPage={authPage} handleOpenMenu={handleOpenMenu} />

        <Box component={'main'} display={'flex'} flex={'1 0 auto'}>
          {authPage ? (
            <>{children}</>
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
