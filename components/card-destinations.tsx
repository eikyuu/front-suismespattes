'use client';
import {
  useQueryClient,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';
import { useState, useEffect, Fragment, use } from 'react';
import { fetchDestination, getDestinationsByQueries } from '../@core/services/destinationService';
import CardDestination from './card-destination';
import LoaderDestinations from './loader/loader-destinations';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useCreateQueryString } from '../@core/hooks/useCreateQueryString';
import toast from 'react-hot-toast';

export default function CardDestinations() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { pathname, searchParam, createQueryString } =
    useCreateQueryString('page');
  const { searchParam: cityParam } = useCreateQueryString('city');


  const [page, setPage] = useState(1);
  const totalItems = 12;


  const { status, data, error, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['getDestinations', page, cityParam],
    queryFn: () => {
      if (cityParam) {
        return getDestinationsByQueries(page, totalItems, cityParam);
      } else {
        return fetchDestination(page, totalItems);
      }
    },
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
    if (
      !isPlaceholderData &&
      data?.pagination.total > data?.destinations.length
    ) {
      queryClient.prefetchQuery({
        queryKey: ['getDestinations', page + 1, cityParam],
        queryFn: () => {
          if (cityParam) {
            return getDestinationsByQueries(page + 1, totalItems, cityParam);
          } else {
            return fetchDestination(page + 1, totalItems);
          }
        } ,
      });
    }
  }, [data, isPlaceholderData, page, queryClient, cityParam]);

  function handlePageChange(newPage: number) {
    const totalPages = data?.pagination.totalPages;
    const validatedPage = Math.max(1, Math.min(newPage, totalPages));

    if (validatedPage === page) {
      return;
    }

    setPage(validatedPage);
    router.push(
      pathname + '?' + createQueryString('page', validatedPage.toString())
    );
  }

  if (error) return toast.error('Une erreur est survenue');

  return (
    <Fragment>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center place-items-center gap-16'>
        {isLoading && <LoaderDestinations />}
        {data?.destinations.map((destination: any) => (
          <CardDestination key={destination.id} destination={destination} />
        ))}
      </div>

      <div className='text-center mt-10'>
        <Button
          className='mr-2'
          disabled={page === 1 || isLoading}
          onClick={() => handlePageChange(page - 1)}
        >
          Précédent
        </Button>
        <Button
          disabled={page === data?.pagination.totalPages || isLoading || data.destinations.length === 0}
          onClick={() => handlePageChange(page + 1)}
        >
          Suivant
        </Button>
      </div>
    </Fragment>
  );
}
