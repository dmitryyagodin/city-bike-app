import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '@components';
import { ContextProvider } from '../context/stationContext';
import { RidesContextProvider } from '../context/ridesContext';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <ContextProvider>
        <RidesContextProvider>
          <Component {...pageProps} />
        </RidesContextProvider>
      </ContextProvider>
    </Layout>
  );
}

export default MyApp;
