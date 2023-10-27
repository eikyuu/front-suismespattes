'use client';
import Title from '@/components/ui/text/Title';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { fetchDestinations } from '../../@core/services/destinationService';

export const MapContent = dynamic(() => import('./map-content'), {
  ssr: false,
})

function MapContainer({ title, destination }: { title: string; destination?: any }) {

    const { isLoading, error, data } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => {
      if (destination) {
        return [];
      } 
      return fetchDestinations();
    },
  })

  if (error) return <p>Une erreur est survenue</p>;

  
  return (
    <section className='bg-primary mx-auto pt-10 pb-10 flex flex-col'>
      <div className='container mx-auto '>
      <Title className='text-white text-center mb-10' balise='h2'>
        {title}
      </Title>
        {isLoading && <p>Chargement...</p>}
        <MapContent destinations={destination ? [destination] : data?.destinations} />
      </div>
    </section>
  );
}

export default MapContainer;
