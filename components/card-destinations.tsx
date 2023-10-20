'use client';
import {
  useQueryClient,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';
import { useState, useEffect, Fragment, use } from 'react';
import { fetchDestination } from '../@core/services/destinationService';
import CardDestination from './card-destination';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoaderDestinations from './loader/loader-destinations';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useCreateQueryString } from '../@core/hooks/useCreateQueryString';

export default function CardDestinations() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { pathname, searchParam, createQueryString } =
    useCreateQueryString('page');

  const [page, setPage] = useState(1);

  const { status, data, error, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => fetchDestination(page, 10),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  useEffect(() => {
    if (searchParam) {
      setPage(parseInt(searchParam));
    }
  }, [searchParam]);

  // Prefetch the next page!
  useEffect(() => {

    if (data?.pagination.total > data?.destinations.length) {
      console.log('prefetching');
    }
    if (
      !isPlaceholderData &&
      data?.pagination.total > data?.destinations.length
    ) {
      queryClient.prefetchQuery({
        queryKey: ['projects', page + 1],
        queryFn: () => fetchDestination(page + 1, 10),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  if (error) return 'An error has occurred: ' + error.message;

  function handlePageChange(newPage: number) {
    if (newPage < 1) {
      newPage = 1;
    }

    if (newPage > data?.pagination.totalPages) {
      newPage = data?.pagination.totalPages;
    }

    if (newPage === page) {
      return;
    }

    setPage(newPage);
    router.push(pathname + '?' + createQueryString('page', newPage.toString()));
  }

  return (
    <Fragment>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center place-items-center gap-16'>
        {isLoading && <LoaderDestinations />}
        {data?.destinations.map((destination: any) => (
          <CardDestination key={destination.id} destination={destination} />
        ))}
        <ReactQueryDevtools initialIsOpen />
      </div>

      <div className='text-center'>
        <Button
          className='mr-2'
          disabled={page === 1 || isLoading}
          onClick={() => handlePageChange(page - 1)}
        >
          Précédent
        </Button>
        <Button
          disabled={page === data?.pagination.totalPages || isLoading}
          onClick={() => handlePageChange(page + 1)}
        >
          Suivant
        </Button>
      </div>
    </Fragment>
  );
}
