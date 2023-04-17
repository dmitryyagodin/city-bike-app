import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '@components';
import { ContextProvider } from '../context/stationContext';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </Layout>
  );
}

export default MyApp;
