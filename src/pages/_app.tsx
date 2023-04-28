import type { AppProps } from 'next/app';
import { Layout } from '@components';
import { ContextProvider } from '../context/stationContext';
import { RidesContextProvider } from '../context/ridesContext';
import { ThemeProvider, GlobalStyle } from '../theme';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <Layout>
        <ContextProvider>
          <RidesContextProvider>
            <GlobalStyle />
            <Component {...pageProps} />
          </RidesContextProvider>
        </ContextProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
