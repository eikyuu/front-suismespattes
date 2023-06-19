'use client';

import { useEffect, useState } from 'react';
import { useFetchData } from '../../../../@core/hooks/useFetchData';
import LargeTitle from '../../../../ui/atoms/largeTitle/largeTitle';
import MapWalk from '../../../../ui/molecules/mapWalk/mapWalk';
import Reviews from '../../../../ui/molecules/reviews/reviews';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import banner from '../../../../public/images/banner.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs } from 'swiper';
import type { Swiper as S } from 'swiper';
import React from 'react';
import Loader from '../../../../ui/molecules/Loader/LoaderReviews';
import LoaderWalk from '../../../../ui/molecules/Loader/LoaderWalk';

export default function Page({
  params,
}: {
  params: { slug: string };
}): JSX.Element {
  const [thumbsSwiper, setThumbsSwiper] = useState<S | null>(null);

  const [dogWalk, setDogWalk] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, [isMobile]);

  useFetchData(
    'https://my-json-server.typicode.com/eikyuu/db/review',
    setReviews
  );

  useFetchData(
    'https://my-json-server.typicode.com/eikyuu/db/dogWalk',
    setDogWalk
  );

  const handleNote = (note: number) => {
    switch (note) {
      case 1:
        return 'Trés négatif';
      case 2:
        return 'Négatif';
      case 3:
        return 'Neutre';
      case 4:
        return 'Positif';
      case 5:
        return 'Trés positif';
      default:
        return 'Neutre';
    }
  };

  const dogWalkFiltered = dogWalk.filter(
    (dogWalk: any) => dogWalk.slug === params.slug
  );

  return (
    <main className='font-sans'>
      {dogWalk.length === 0 && <LoaderWalk />}

      <section className='container mx-auto h-full flex flex-col justify-between pt-10 pb-10 md:flex-row'>
        <div className='w-11/12 mx-auto md:m-0 md:w-1/2'>
          <Swiper
            style={
              {
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              } as React.CSSProperties
            }
            loop={true}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            className='mySwiper2'
          >
            {dogWalk.map((dogWalk: any) => (
              <SwiperSlide key={dogWalk.id}>
                <Image
                  className='rounded-xl object-cover'
                  src={banner}
                  alt='banner'
                  placeholder='blur'
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className='mySwiper mt-2'
          >
            {dogWalk.map((dogWalk: any) => (
              <SwiperSlide key={dogWalk.id}>
                <Image
                  className='rounded-xl object-cover'
                  src={banner}
                  alt='banner'
                  placeholder='blur'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='mx-auto mt-4 w-11/12 md:mt-0 md:w-2/5'>
          {dogWalkFiltered.map((dogWalk: any) => (
            <div className='h-full' key={dogWalk.id}>
              <LargeTitle title={dogWalk.city} />
              <p className='mt-4 mb-4'>{dogWalk.description}</p>
              <p className='mt-4 mb-4'>
                &#11088;
                <span className='ml-2 font-bold'>5</span>/5{' '}
                <span className='font-bold'>Trés positifs !</span>
              </p>
              <p className='mt-4 mb-4'>
                &#x25AE; A 20km de votre position actuelle
              </p>
              <p>
                Point deau buvable pour les chiens :{' '}
                <span className='font-bold'>
                  {dogWalk.water_point ? 'Oui' : 'Non'}
                </span>
              </p>
              <p className='mt-4 mb-4'>
                Laisse obligatoire :{' '}
                <span className='font-bold'>
                  {dogWalk.obligatory_leash ? 'Oui' : 'Non'}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <Reviews reviews={reviews} />

      <div className='container mx-auto pt-10 w-11/12 md:w-1/2'>
        <MapWalk dogWalk={dogWalk} />
      </div>
    </main>
  );
}
