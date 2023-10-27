'use client';
import Title from '@/components/ui/text/Title';
import { useEffect, useState } from 'react';
import { API_URL } from '../../@core/constants/global';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { fetchDestination, fetchDestinationBySlug, fetchDestinations } from '../../@core/services/destinationService';

export const MapContent = dynamic(() => import('./map-content'), {
  ssr: false,
})

function MapContainer({ title, slug, destination }: { title: string; slug?: string, destination?: any }) {

   // const { isLoading, error, data } = useQuery({
  //   queryKey: ['destinationBySlug', slug],
  //   queryFn: () => fetchDestinationBySlug(slug),
  // })

    const { isLoading, error, data } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => {
      if (destination) {
        return [];
      } 
      return fetchDestinations();

    },
  })
  

  return (
    <section className='bg-primary mx-auto pt-10 pb-10 flex flex-col'>

      <div className='container mx-auto '>
      <Title className='text-white text-center mb-10' balise='h2'>
        {title}
      </Title>
        <MapContent destinations={destination ? [destination] : data?.destinations} />
      </div>
    </section>
  );
}

export default MapContainer;
