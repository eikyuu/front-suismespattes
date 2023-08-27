import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import React from 'react';
import LargeTitle from './text/LargeTitle';
import LoaderWalks from './loader/LoaderWalks';
import Button from './button/Button';
import CardWalk from './CardWalk';

function LastWalk({ dogWalk }: { dogWalk: any }): JSX.Element {
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
          <LargeTitle title='Les dernières destinations' />
          <div className='container mx-auto flex flex-col flex-wrap justify-between pt-10 pb-10 md:flex-row'>
          {dogWalk.length === 0 && <LoaderWalks />}

            <Swiper
              slidesPerView={'auto'}
              spaceBetween={16}
              className='w-full h-full'
            >
              {dogWalk.slice(0, 4).map((dogWalk: any) => (
                <SwiperSlide key={dogWalk.id} className='!w-11/12 last:w-full'>
                  <CardWalk
                    city={dogWalk.city}
                    name={dogWalk.name}
                    description={dogWalk.description}
                    slug={dogWalk.slug}
                    imageName={dogWalk.images[0]?.name}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='text-center'>
            <Link className='outline-none' href='/toutes-les-destinations'>
              <Button text='Voir toutes les destinations' />
            </Link>
          </div>
        </section>
      ) : (
        <section className='h-full w-11/12 mx-auto pt-10 pb-10'>
          <LargeTitle title='Les dernières destinations' />
          <div className='container mx-auto mt-10 mb-10 flex flex-col flex-wrap justify-between md:flex-row'>
          {dogWalk.length === 0 && <LoaderWalks />}
            {dogWalk.slice(0, 4).map((dogWalk: any) => (
              <CardWalk
                key={dogWalk.id}
                city={dogWalk.city}
                name={dogWalk.name}
                description={dogWalk.description}
                slug={dogWalk.slug}
                imageName={dogWalk.images[0]?.name}
              />
            ))}
          </div>
          <div className='text-center'>
            <Link className='outline-none' href='/toutes-les-destinations'>
              <Button text='Voir toutes les destinations' />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default LastWalk;
