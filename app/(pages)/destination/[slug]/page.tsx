'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper';
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
import Link from 'next/link';
import Button from '../../../components/button/Button';
import { useSession } from 'next-auth/react';

export default function Page({
  params,
}: {
  params: { slug: string };
}): JSX.Element {
  const [thumbsSwiper, setThumbsSwiper] = useState<S | null>(null);
  const url = `${API_URL}destination/${params.slug}`;
  const { data: session, status } = useSession();
  const { data, error } = useFetch<any>(url);

  if (status === 'loading' || !data) {
    return <LoaderDestination />;
  }

  if (error) {
    toast.error('Une erreur est survenue');
    return <p>Une erreur est survenue.</p>;
  }

  const handleNote = (note: number) => {
    switch (note) {
      case 1:
        return (
          String.fromCharCode(9733) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734)
        );
      case 2:
        return (
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734)
        );
      case 3:
        return (
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734)
        );
      case 4:
        return (
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9734)
        );
      case 5:
        return (
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9733)
        );
      default:
        return (
          String.fromCharCode(9734) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734)
        );
    }
  };

  const handleObligatoryLeash = (
    obligatoryLeash: 'RECOMANDED' | 'YES' | 'NO'
  ) => {
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
  };

  return (
    <main className='h-full'>
      <ScrollUp />

      {data && (
        <>
          {session?.user?.roles?.includes('ROLE_ADMIN') && (
            <div className='flex justify-end items-end pt-10 w-11/12 mx-auto '>
              <Link
                className='block relative top-0 right-0'
                href={`/destination/${data.slug}/edit`}
              >
                <Button text='Modifier' />
              </Link>
            </div>
          )}

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
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs, Navigation]}
                className='mySwiper2 w-full'
              >
                {data && data.images.length > 0 ? (
                  data.images.map((data: any) => (
                    <SwiperSlide key={data.id} className='w-full'>
                      <BlurImage
                        height='h-144'
                        alt={data.name}
                        image={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${data.name}`}
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
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs, Navigation]}
                className='mySwiper mt-2'
              >
                {data && data.images.length > 0 ? (
                  data.images.map((data: any) => (
                    <SwiperSlide key={data.id}>
                      <BlurImage
                        height='h-40'
                        alt={data.name}
                        image={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${data.name}`}
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
              <div className='h-full flex flex-col justify-between '>
                <div>
                  <LargeTitle title={data.name} />
                  <p className='mt-4 lowercase first-letter:uppercase'>
                    {data.description}
                  </p>
                  <p className='mt-4'>
                    Note :{' '}
                    <span className='font-semibold text-yellow-400'>
                      {handleNote(data.note)}
                    </span>
                  </p>
                  <BlocTextWithspan
                    dogDestination={data.waterPoint}
                    text='Point d&#039;eau buvable pour les chiens : '
                  />
                  <BlocTextWithspan
                    dogDestination={handleObligatoryLeash(data.obligatoryLeash)}
                    text='Laisse obligatoire : '
                  />
                  <p className='mt-4'>
                    Adresse de la destination :{' '}
                    <span className='font-semibold'>
                      {data.street}, {data.postalCode}, {data.city}
                    </span>
                  </p>
                  <p className='mt-4'>
                    Coordonnées GPS :{' '}
                    <span className='font-semibold'>
                      {data.latitude}, {data.longitude}{' '}
                    </span>
                  </p>
                  {data.latitude && data.longitude && (
                    <a
                      className='block mt-4'
                      href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {' '}
                      <span className='font-semibold'>
                        Lien direct Google maps
                      </span>
                    </a>
                  )}
                  {data.cyanobacteriaAlert && (
                    <TextAlert text='Présence de cyanobactéries ! *' />
                  )}
                  {data.processionaryCaterpillarAlert && (
                    <TextAlert text='Présence de chenilles processionnaire ! *' />
                  )}
                </div>
                <div>
                  <p className='mt-4 italic font-semibold text-xs'>
                    La responsabilité de la destination ne peut être encourue
                    pour aucun dommage ou danger, chacun est responsable de son
                    propre bien-être et de ses animaux. *
                  </p>

                  <p className='mt-4 italic font-semibold text-xs'>
                    Merci de respecter les lieux et de ne pas laisser de déchets
                    derrière vous. **
                  </p>
                </div>
              </div>
            </div>
          </section>
          <MapContainer
            dogDestination={[data]}
            coordinates={[data.latitude, data.longitude]}
            title={`${data.name}`}
          />
        </>
      )}
    </main>
  );
}
