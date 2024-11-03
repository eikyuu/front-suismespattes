import React from "react";
import { QueryCache, QueryClient, dehydrate } from "@tanstack/query-core";
import { ReactQuery } from "./reactQuery";
import toast from 'react-hot-toast';

export default async function Provider({children}: {children: React.ReactNode}) {
    const queryClient = new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            console.error(error, query) 
            // 🎉 only show error toasts if we already have data in the cache
            // which indicates a failed background update
            if (query.state.data !== undefined) {
              toast.error(`Something went wrong: ${error.message}`)
            }
          },
        }),
      })
    // alternatively, use queryClient.setQuery and/or access data directly
    // await queryClient.prefetchQuery(['test'], fetchTest);
    
    const provider =
        <ReactQuery dehydratedState={dehydrate(queryClient)}>
            {children}
        </ReactQuery>

    queryClient.clear();
    return provider;
}