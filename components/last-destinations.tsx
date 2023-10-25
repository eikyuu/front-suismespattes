'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LoaderDestinations from './loader/loader-destinations';
import { Button } from '@/components/ui/button';
import CardDestination from './card-destination';
import Title from '@/components/ui/text/Title';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { fetchDestination } from '../@core/services/destinationService';

function LastDestinations(): JSX.Element {
  const [isMobile, setIsMobile] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => fetchDestination(1, 4),
  })

  const handleResize = () => {
    window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, [isMobile]);

  if (error) toast.error('Une erreur est survenue');

  return (
    <>
      {isMobile ? (
        <section className='h-full pt-10 pb-10'>
          <Title className='text-center' balise='h2'>
            Les dernières destinations
          </Title>
          <div className='w-11/12 mx-auto flex flex-col flex-wrap justify-between pt-10 pb-10 md:flex-row'>
          {isLoading && <LoaderDestinations />}

            <Swiper
              slidesPerView={'auto'}
              spaceBetween={16}
              className='w-full h-full'
            >
              {data?.destinations.slice(0, 4).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((destination: any) => (
                <SwiperSlide key={destination.id} className='!w-11/12 last:w-full'>
                  <CardDestination
                    height='h-72'
                    destination={destination}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='text-center'>
            <Link className='outline-none' href='/destinations-chien-accepte'>
              <Button>
                Voir toutes les destinations
              </Button>
            </Link>
          </div>
        </section>
      ) : (
        <section className='container h-full mx-auto flex flex-col flex-wrap justify-center w-11/12 md:w-full xl:h-166 pt-10 pb-10 bg-map bg-center bg-cover bg-no-repeat bg-opacity-80'>
          <Title balise='h2' className='text-center mb-10'>
            Les dernières destinations
          </Title>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center place-items-center'>
          {isLoading && <LoaderDestinations />}
            {data?.destinations.slice(0, 4).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((destination: any) => (
              <CardDestination 
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
          <div className='text-center mt-5'>
            <Link className='outline-none' href='/destinations-chien-accepte'>
              <Button>
                Voir toutes les destinations
              </Button>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default LastDestinations;
