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
import BlurImage from '../../../components/blurImage/BlurImage';
import MapContainer from '../../../components/map/MapContainer';
import BlocTextWithspan from '../../../components/text/BlocTextWithSpan';
import LargeTitle from '../../../components/text/LargeTitle';
import TextAlert from '../../../components/text/TextAlert';
import LoaderDestination from '../../../components/loader/LoaderDestination';

export default function Page({
  params,
}: {
  params: { slug: string };
}): JSX.Element {
  const [thumbsSwiper, setThumbsSwiper] = useState<S | null>(null);
  const [dogDestination, setDogDestination] = useState<any>();

  const url = `${API_URL}destination/${params.slug}`;

  const { data, error } = useFetch<any>(url)

  useEffect(() => {
    if (data) {
      setDogDestination(data);
    } else if (error) {
      console.error(error);
      toast.error('Une erreur est survenue');
    }
  }, [data, error]);

  const handleNote = (note: number) => {
    switch (note) {
      case 1:
        return String.fromCharCode(9733) + String.fromCharCode(9734) + String.fromCharCode(9734) + String.fromCharCode(9734) + String.fromCharCode(9734);  
      case 2:
        return String.fromCharCode(9733) + String.fromCharCode(9733) + String.fromCharCode(9734) + String.fromCharCode(9734) + String.fromCharCode(9734);
      case 3:
        return String.fromCharCode(9733) + String.fromCharCode(9733) + String.fromCharCode(9733) + String.fromCharCode(9734) + String.fromCharCode(9734);
      case 4:
        return String.fromCharCode(9733) + String.fromCharCode(9733) + String.fromCharCode(9733) + String.fromCharCode(9733) + String.fromCharCode(9734);
      case 5:
        return String.fromCharCode(9733) + String.fromCharCode(9733) + String.fromCharCode(9733) + String.fromCharCode(9733) + String.fromCharCode(9733);
      default:
        return String.fromCharCode(9734) + String.fromCharCode(9734) + String.fromCharCode(9734) + String.fromCharCode(9734) + String.fromCharCode(9734);
    }
  };


  const handleObligatoryLeash = (obligatoryLeash: 'RECOMANDED' | 'YES' | 'NO' ) => {
    switch (obligatoryLeash) {
      case 'RECOMANDED':
        return 'Recommandé';
      case 'YES':
        return 'Oui';
      case 'NO':
        return 'Non';
      default:
        return 'Non';
    }
  }

  return (
    <main className='h-full	'>
      <ScrollUp />
      {!dogDestination && <LoaderDestination />}

      {dogDestination && (
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
                {dogDestination && dogDestination.images.length > 0 ? (
                  dogDestination.images.map((dogDestination: any) => (
                    <SwiperSlide key={dogDestination.id} className='w-full'>
                      <BlurImage
                        height='h-144'
                        alt={dogDestination.name}
                        image={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${dogDestination.name}`}
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
                {dogDestination && dogDestination.images.length > 0 ? (
                  dogDestination.images.map((dogDestination: any) => (
                    <SwiperSlide key={dogDestination.id}>
                      <BlurImage
                        height='h-40'
                        alt={dogDestination.name}
                        image={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${dogDestination.name}`}
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
              <div className='h-full '>
                <LargeTitle title={dogDestination.name} />
                <p className='mt-4 lowercase first-letter:uppercase'>{dogDestination.description}</p>
                <p className='mt-4'>
                  Note :{' '}
                  <span className='font-semibold text-yellow-400'>
                    {handleNote(dogDestination.note)}
                  </span>
                </p>
                <BlocTextWithspan
                  dogDestination={dogDestination.waterPoint}
                  text='Point d&#039;eau buvable pour les chiens : '
                />
                
                <BlocTextWithspan
                  dogDestination={handleObligatoryLeash(dogDestination.obligatoryLeash)}
                  text='Laisse obligatoire : '
                />
                <p className='mt-4'>Adresse de la destination : <span className='font-semibold'>{dogDestination.street}, {dogDestination.postalCode}, {dogDestination.city}</span></p>
                <p className='mt-4'>Coordonnées GPS :  <span className='font-semibold'>{dogDestination.latitude}, {dogDestination.longitude} </span></p>
                {dogDestination.latitude && dogDestination.longitude && (
                      <a className='block mt-4' href={`https://www.google.com/maps?q=${dogDestination.latitude},${dogDestination.longitude}`} target="_blank" rel="noreferrer"> <span className='font-semibold'>Lien direct Google maps</span></a>
                )}
                {dogDestination.cyanobacteriaAlert && (
                  <TextAlert text='Présence de cyanobactéries !' />
                )}
                {dogDestination.processionaryCaterpillarAlert && (
                  <TextAlert text='Présence de chenilles processionnaire !' />
                )}
              </div>
            </div>
          </section>
          <MapContainer
            dogDestination={[dogDestination]}
            coordinates={[dogDestination.latitude, dogDestination.longitude]}
            title={`${dogDestination.name}`}
          />
        </>
      )}
    </main>
  );
}
