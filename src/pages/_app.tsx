import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import Header from '../components/header/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="./favicon.ico" />
        <title>Nextjs | tailwind</title>
      </Head>
      <div>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
export default MyApp;
