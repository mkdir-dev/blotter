import { memo } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { CacheProvider } from '@emotion/react';
import { type EmotionCache } from '@emotion/cache';

import { theme } from '@/assets/theme/theme';
import { createEmotionCache } from '@/core/utils/create-emotion-cashe';

const createCache = createEmotionCache();

const App = (props: AppProps & { emotionCache: EmotionCache }) => {
  const { Component, pageProps, emotionCache = createCache } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="keywords"
          content="Material Design, MUI, Admin Template, React Admin Template"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default memo(App);
