import 'styles/global.css';
import type { AppProps } from 'next/app';
import { Roboto as getRobotoConfigs } from '@next/font/google';

const roboto = getRobotoConfigs({
  weight: '400',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
