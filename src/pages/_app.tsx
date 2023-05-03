import type { AppProps } from 'next/app';
import { Layout } from '@components';
import { ContextProvider } from '../context/stationContext';
import { RidesContextProvider } from '../context/ridesContext';
import { ThemeProvider, GlobalStyle } from '../theme';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { PageLoader } from '@components';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      const isStationStaticPage = /stations\?skip=/.test(url);

      if (!isStationStaticPage) {
        setIsLoading(true);
      }
    });

    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });

    Router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
  });

  return (
    <ThemeProvider>
      <Layout>
        <ContextProvider>
          <RidesContextProvider>
            <GlobalStyle />
            {isLoading && <PageLoader />}
            <Component {...pageProps} />
          </RidesContextProvider>
        </ContextProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
