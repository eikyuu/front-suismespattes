'use client';

import { useState } from 'react';
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
import { FreeMode, Navigation, Thumbs } from 'swiper';
import type { Swiper as S } from 'swiper';

export default function Page({
  params,
}: {
  params: { slug: string };
}): JSX.Element {
  const [thumbsSwiper, setThumbsSwiper] = useState<S | null>(null);

  const [dogWalk, setDogWalk] = useState([]);
  const [reviews, setReviews] = useState([]);

  useFetchData(
    'https://my-json-server.typicode.com/eikyuu/db/review',
    setReviews
  );

  useFetchData(
    'https://my-json-server.typicode.com/eikyuu/db/dogWalk',
    setDogWalk
  );

  const dogWalkFiltered = dogWalk.filter(
    (dogWalk: any) => dogWalk.slug === params.slug
  );

  return (
    <main className='font-sans'>
      <section className='container mx-auto h-full flex flex-col justify-between pt-10 pb-10 md:flex-row'>
        <div className='w-11/12 mx-auto md:w-1/2 xl:mr-10'>
          <Swiper
            style={
              {
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              } as React.CSSProperties
            }
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
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
            modules={[FreeMode, Navigation, Thumbs]}
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
              <p className='mt-4 mb-4'>5/5 Tres positifs !</p>
              <p className='mt-4 mb-4'>A 20km de votre position actuelle</p>
              <p>
                Point deau buvable pour les chiens :{' '}
                {dogWalk.water_point ? 'Oui' : 'Non'}
              </p>
              <p className='mt-4 mb-4'>
                Laisse obligatoire : {dogWalk.obligatory_leash ? 'Oui' : 'Non'}
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
