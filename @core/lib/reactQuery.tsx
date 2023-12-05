'use client';

import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from '@tanstack/react-query';
import Script from 'next/script';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  dehydratedState: DehydratedState;
  children: React.ReactNode;
};
export function ReactQuery({ dehydratedState, children }: Props) {
  const [queryClient] = useState(new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools/>
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
      </QueryClientProvider>
      <Script id='react-query'>
        {`window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)}`}
      </Script>
    </>
  );
}
