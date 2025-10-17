import '@/styles/globals.css';
import '@/shared/icons';
import type { AppProps } from 'next/app';
import { BottomNav } from '@/shared/components/tab/BottomNav';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <BottomNav />
    </>
  );
}
