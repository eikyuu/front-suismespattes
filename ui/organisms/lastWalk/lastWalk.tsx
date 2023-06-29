import LargeTitle from '../../atoms/largeTitle/largeTitle';
import CardWalk from '../../molecules/cardWalk/cardWalk';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import React from 'react';
import LoaderWalks from '../../molecules/Loader/LoaderWalks';
import Button from '../../atoms/button/button';

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
          <LargeTitle title='Les dernières balades' />
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
                    description={dogWalk.description}
                    slug={dogWalk.slug}
                    imageName={dogWalk.images[0]?.name}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='text-center'>
            <Link className='outline-none' href='/toutes-les-balades'>
              <Button text='Voir toutes les balades' />
            </Link>
          </div>
        </section>
      ) : (
        <section className='h-full w-11/12 mx-auto pt-10 pb-10'>
          <LargeTitle title='Les dernières balades' />
          <div className='container mx-auto mt-10 mb-10 flex flex-col flex-wrap justify-between md:flex-row'>
          {dogWalk.length === 0 && <LoaderWalks />}
            {dogWalk.slice(0, 4).map((dogWalk: any) => (
              <CardWalk
                key={dogWalk.id}
                city={dogWalk.city}
                description={dogWalk.description}
                slug={dogWalk.slug}
                imageName={dogWalk.images[0]?.name}
              />
            ))}
          </div>
          <div className='text-center'>
            <Link className='outline-none' href='/toutes-les-balades'>
              <Button text='Voir toutes les balades' />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default LastWalk;
