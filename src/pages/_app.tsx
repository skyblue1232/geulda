import '@/styles/globals.css';
import '@/shared/icons';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BottomNav } from '@/shared/components/tab/BottomNav';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen pb-[10rem]">
        {/* 페이지 내용 */}
        <Component {...pageProps} />
        {/* 하단 네비 */}
        <BottomNav />
      </div>
    </QueryClientProvider>
  );
}
