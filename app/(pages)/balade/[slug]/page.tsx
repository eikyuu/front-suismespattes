'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs } from 'swiper';
import { Swiper as S } from 'swiper';
import React from 'react';
import ScrollUp from '../../../../@core/utils/scrollUp';
import { API_URL } from '../../../../@core/constants/global';
import { useFetch } from '../../../../@core/hooks/useFetch';
import toast from 'react-hot-toast';
import LoaderWalk from '../../../components/loader/LoaderWalk';
import BlurImage from '../../../components/blurImage/BlurImage';
import WalkMap from '../../../components/WalkMap';
import BlocTextWithspan from '../../../components/text/BlocTextWithSpan';
import LargeTitle from '../../../components/text/LargeTitle';
import TextAlert from '../../../components/text/TextAlert';

export default function Page({
  params,
}: {
  params: { slug: string };
}): JSX.Element {
  const [thumbsSwiper, setThumbsSwiper] = useState<S | null>(null);
  const [dogWalk, setDogWalk] = useState<any>();
  // const [isMobile, setIsMobile] = useState(false);

  // const handleResize = useCallback(() => {
  //   if (window.innerWidth < 768) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  // }, [handleResize]);

  const url = `${API_URL}walks/${params.slug}`;

  const { data, error } = useFetch<any>(url)

  useEffect(() => {
    if (data) {
      setDogWalk(data);
    } else if (error) {
      console.error(error);
      toast.error('Une erreur est survenue');
    }
  }, [data, error]);

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
                {dogWalk && dogWalk.images.length > 0 ? (
                  dogWalk.images.map((dogWalk: any) => (
                    <SwiperSlide key={dogWalk.id} className='w-full'>
                      <BlurImage
                        height='h-144'
                        alt={dogWalk.name}
                        image={`${process.env.NEXT_PUBLIC_API_URL}walks/images/${dogWalk.name}`}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <Image
                    className='rounded-lg object-cover h-144 w-full'
                    src={'/images/placeholder.png'}
                    width={500}
                    height={500}
                    alt='Picture of the author'
                  />
                )}
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
                {dogWalk && dogWalk.images.length > 0 ? (
                  dogWalk.images.map((dogWalk: any) => (
                    <SwiperSlide key={dogWalk.id}>
                      <BlurImage
                        height='h-40'
                        alt={dogWalk.name}
                        image={`${process.env.NEXT_PUBLIC_API_URL}walks/images/${dogWalk.name}`}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <Image
                    className='rounded-lg object-cover h-36'
                    src={'/images/placeholder.png'}
                    width={500}
                    height={500}
                    alt='Une image par défaut'
                  />
                )}
              </Swiper>
            </div>
            <div className='mt-4 w-11/12 md:mt-0 md:w-2/5 mx-auto md:m-0'>
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
                <p className='mt-4'>Adresse de la balade : <span className='font-semibold'>{dogWalk.street}, {dogWalk.postalCode}, {dogWalk.city}</span></p>
                <p className='mt-4'>Coordonnées GPS :  <span className='font-semibold'>{dogWalk.latitude}, {dogWalk.longitude} </span></p>
                <a className='block mt-4' href={`https://www.google.com/maps?q=${dogWalk.latitude},${dogWalk.longitude}`} target="_blank" rel="noreferrer"> <span className='font-semibold'>Lien direct Google maps</span></a>
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
