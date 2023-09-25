import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import React from 'react';
import LoaderDestinations from './loader/LoaderDestinations';
import Button from './button/Button';
import CardDestination from './CardDestination';
import Title from './text/Title';

function LastDestinations({ dogDestination }: { dogDestination: any }): JSX.Element {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        <section className='h-full w-11/12 mx-auto  pt-10 pb-10'>
          <Title title='Les dernières destinations' balise='h2' />
          <div className='container mx-auto flex flex-col flex-wrap justify-between pt-10 pb-10 md:flex-row'>
          {dogDestination.length === 0 && <LoaderDestinations />}

            <Swiper
              slidesPerView={'auto'}
              spaceBetween={16}
              className='w-full h-full'
            >
              {dogDestination.slice(0, 4).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((dogDestination: any) => (
                <SwiperSlide key={dogDestination.id} className='!w-11/12 last:w-full'>
                  <CardDestination
                    destination={dogDestination}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='text-center'>
            <Link className='outline-none' href='/toutes-les-destinations'>
              <Button>
                Voir toutes les destinations
              </Button>
            </Link>
          </div>
        </section>
      ) : (
        <section className='h-full md:h-166 w-11/12 mx-auto flex flex-col justify-center bg-map bg-center bg-cover bg-no-repeat bg-opacity-80'>
          <Title title='Les dernières destinations' balise='h2' className='text-center' />
          <div className='container mx-auto mt-10 mb-10 flex flex-col flex-wrap justify-between md:flex-row'>
          {dogDestination.length === 0 && <LoaderDestinations />}
            {dogDestination.slice(0, 4).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((dogDestination: any) => (
              <CardDestination
                key={dogDestination.id}
                destination={dogDestination}
              />
            ))}
          </div>
          <div className='text-center'>
            <Link className='outline-none' href='/toutes-les-destinations'>
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
