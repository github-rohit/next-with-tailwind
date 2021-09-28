import '../styles/globals.css';
import Header from '../components/header/Header';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
