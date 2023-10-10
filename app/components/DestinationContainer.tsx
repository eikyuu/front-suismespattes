'use client';
import toast from 'react-hot-toast';
import { API_URL } from '../../@core/constants/global';
import { useFetch } from '../../@core/hooks/useFetch';
import { Destination } from '../../@core/types/DestinationForm';
import LoaderDestination from './loader/LoaderDestination';
import { useSession } from 'next-auth/react';
import MapContainer from './map/MapContainer';
import Link from 'next/link';
import SwiperContainer from './SwiperContainer';
import Title from './text/Title';
import BlocTextWithspan from './text/BlocTextWithSpan';
import Text from './text/Text';
import { Country } from '../../@core/enum/Country';
import { Button } from '@/components/ui/button';

function DestinationContainer({slug }: { slug: string }) {
  const url = `${API_URL}destination/${slug}`;
  const { data: session, status } = useSession();
  const { data, error } = useFetch<Destination>(url);

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

      <>
      {session?.user?.roles?.includes('ROLE_ADMIN') && (
        <div className='flex justify-end items-end pt-10 w-11/12 mx-auto '>
          <Link
            className='block relative top-0 right-0'
            href={`/destination-chien-accepte/${data.slug}/edit`}
          >
            <Button>
              MODIFIER
            </Button>
          </Link>
        </div>
      )}

      <section className='container w-11/12 mx-auto h-full flex flex-col justify-between pt-10 pb-10 md:flex-row'>
        <SwiperContainer data={data.images} />
        <div className='mt-4 w-11/12 md:mt-0 md:w-2/5 mx-auto md:m-0'>
          <div className='h-full flex flex-col justify-between '>
            <div>
              <Title balise='h1' className='text-center'>
                {data.name}
              </Title>
              <p className='mt-4 whitespace-pre-wrap	'>
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
                  {data.street}, {data.postalCode}, <span className='uppercase'>{data.city} {Country[data.country]}</span> 
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
                  <span className='font-semibold'>
                    Lien direct Google maps
                  </span>
                </a>
              )}
              {data.cyanobacteriaAlert && (
                <Text type='alert' className='mt-4'>
                  Présence de cyanobactéries ! *
                </Text>
              )}
              {data.processionaryCaterpillarAlert && (
                <Text type='alert' className='mt-4'>
                  Présence de chenilles processionnaire ! *
                </Text>
              )}
            </div>
            <div>
              <p className='mt-4 italic font-semibold text-xs'>
                La responsabilité du site ne peut être encourue
                pour aucun dommage ou danger, chacun est responsable de son
                propre bien-être et de ses animaux. *
              </p>

              <p className='mt-1 italic font-semibold text-xs'>
                Merci de respecter les lieux et de ne pas laisser de déchets
                derrière vous. **
              </p>
            </div>
          </div>
        </div>
      </section>
      <MapContainer
        slug={slug}
        title={`${data.name}`}
      />
    </>
    );
  };

export default DestinationContainer;