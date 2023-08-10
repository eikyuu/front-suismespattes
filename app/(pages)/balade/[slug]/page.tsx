'use client';

import { useEffect, useState } from 'react';
import { useFetchData } from '../../../../@core/hooks/useFetchData';
import LargeTitle from '../../../../ui/atoms/largeTitle/largeTitle';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs } from 'swiper';
import type { Swiper as S } from 'swiper';
import React from 'react';
import LoaderWalk from '../../../../ui/molecules/Loader/LoaderWalk';
import WalkMap from '../../../../ui/organisms/walkMap/walkMap';
import BlocTextWithspan from '../../../../ui/atoms/blocTextWithSpan/ blocTextWithSpan';
import TextAlert from '../../../../ui/atoms/textAlerte/textAlert';
import ScrollUp from '../../../../@core/utils/scrollUp';

export default function Page({
  params,
}: {
  params: { slug: string };
}): JSX.Element {
  const [thumbsSwiper, setThumbsSwiper] = useState<S | null>(null);
  const [dogWalk, setDogWalk] = useState<any>();
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
  };

  useFetchData(`walks/${params.slug}`, setDogWalk);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, [isMobile]);

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
        return 'Trés positif !';
      default:
        return 'Neutre';
    }
  };

  return (
    <main className='font-sans h-full	'>
      <ScrollUp />
      {!dogWalk && <LoaderWalk />}

      {dogWalk && (
        <>
          <section className='container w-11/12 mx-auto h-full flex flex-col justify-between pt-10 pb-10 md:flex-row'>
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
                className='mySwiper2 w-full'
              >
                {dogWalk && dogWalk.images.map((dogWalk: any) => (
                  <SwiperSlide key={dogWalk.id} className='w-full' >
                    <Image
                      className='rounded-lg object-cover h-144 w-full'
                      src={`${process.env.NEXT_PUBLIC_API_URL}walks/images/${dogWalk.name}`}
                      width={500}
                      height={500}
                      alt='Picture of the author'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={false}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className='mySwiper mt-2'
              >
                {dogWalk && dogWalk.images.map((dogWalk: any) => (
                  <SwiperSlide key={dogWalk.id}>
                    <Image
                      className='rounded-lg object-cover h-36'
                      src={`${process.env.NEXT_PUBLIC_API_URL}walks/images/${dogWalk.name}`}
                      width={500}
                      height={500}
                      alt='Picture of the author'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className='mt-4 w-11/12 md:mt-0 md:w-2/5'>
              <div className='h-full'>
                <LargeTitle title={dogWalk.name} />
                <p className='mt-4'>{dogWalk.description}</p>
                <p className='mt-4'>
                  &#11088;
                  <span className='ml-2 font-semibold'>
                    {dogWalk.note}
                  </span>/5{' '}
                  <span className='font-semibold'>
                    {handleNote(dogWalk.note)}
                  </span>
                </p>
                {/* <p className='mt-4'>
                  &#x25AE; A 20km de votre position actuelle
                </p> */}
                <BlocTextWithspan
                  dogWalk={dogWalk.waterPoint}
                  text='Point d&#039;eau buvable pour les chiens :'
                />
                <BlocTextWithspan
                  dogWalk={dogWalk.obligatoryLeash}
                  text='Laisse obligatoire :'
                />
                {dogWalk.cyanobacteriaAlert && (
                  <TextAlert text='Présence de cyanobactéries !' />
                )}
                {dogWalk.processionaryCaterpillarAlert && (
                  <TextAlert text='Présence de chenilles processionnaire !' />
                )}
              </div>
            </div>
          </section>
          {/* <Reviews reviews={reviews} /> */}
          <WalkMap
            dogWalk={[dogWalk]}
            coordinates={[dogWalk.latitude, dogWalk.longitude]}
            title={`${dogWalk.name}`}
          />
        </>
      )}
    </main>
  );
}
