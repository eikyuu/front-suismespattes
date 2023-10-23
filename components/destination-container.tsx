'use client';
import toast from 'react-hot-toast';
import LoaderDestination from './loader/loader-destination';
import { useSession } from 'next-auth/react';
import MapContainer from './map/map-container';
import Link from 'next/link';
import SwiperContainer from '@/components/swiper-container';
import { Country } from '../@core/enum/Country';
import { Button } from '@/components/ui/button';
import { deleteDestination, fetchDestinationBySlug } from '../@core/services/destinationService';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Title from '@/components/ui/text/Title';
import BlocTextWithspan from '@/components/ui/text/BlocTextWithSpan';
import Text from '@/components/ui/text/Text';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function DestinationContainer({ slug }: { slug: string }) {
  const queryClient = useQueryClient()

  const router = useRouter();

  const { data: session, status } = useSession();

  const { isLoading, error, data } = useQuery({
    queryKey: ['destinationBySlug', slug],
    queryFn: () => fetchDestinationBySlug(slug),
  })

  const mutation = useMutation({
    mutationFn: (slug: string) => {
      return deleteDestination(slug);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['destinationBySlug', ] });
      router.push('/');
    }
  })

  if (isLoading) return <LoaderDestination />

  if (error) toast.error('Une erreur est survenue');

  const handleNote = (note: number) => {
    switch (note) {
      case 0:
        return (
          String.fromCharCode(9733) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734)
        );
      case 1:
        return (
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734)
        );
      case 2:
        return (
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9734) +
          String.fromCharCode(9734)
        );
      case 3:
        return (
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9733) +
          String.fromCharCode(9734)
        );
      case 4:
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
            className='block relative top-0 right-0 mr-2'
            href={`/destination-chien-accepte/${data?.slug}/edit`}
          >
            <Button>MODIFIER</Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={'destructive'}
                className='block relative top-0 right-0'
              >
                SUPPRIMER
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Voulez-vous vraiment supprimer cette destination ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Si vous supprimez cette destination, vous ne pourrez plus la
                  récupérer. Vous pouvez la modifier si vous le souhaitez.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  variant={'destructive'}
                  onClick={() => {
                    mutation.mutate(data?.slug);
                  }}
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      <section className='container mx-auto h-full flex flex-col justify-between pt-10 pb-10 md:flex-row'>
        <SwiperContainer data={data?.images} />
        <div className='mt-4 w-11/12 md:mt-0 md:w-2/5 mx-auto md:m-0'>
          <div className='h-full flex flex-col justify-between '>
            <div>
              <Title balise='h1' className='text-center'>
                {data?.name}
              </Title>
              <p className='mt-4 whitespace-pre-wrap	'>{data?.description}</p>
              <p className='mt-4'>
                Note :{' '}
                <span className='font-semibold text-yellow-400'>
                  {handleNote(data?.note)}
                </span>
              </p>
              <BlocTextWithspan
                dogDestination={data?.waterPoint}
                text='Point d&#039;eau buvable pour les chiens : '
              />
              <BlocTextWithspan
                dogDestination={handleObligatoryLeash(data?.obligatoryLeash)}
                text='Laisse obligatoire : '
              />
              <p className='mt-4'>
                Adresse de la destination :{' '}
                <span className='font-semibold'>
                      {data?.street}, {data?.city.postalCode},{' '}
                      <span className='uppercase'>
                        {data?.city.label} 
                      </span>
                    </span>
                  </p>
                  <p className='mt-4'>
                    Coordonnées GPS :{' '}
                    <span className='font-semibold'>
                      {data?.latitude}, {data?.longitude}{' '}
                </span>
              </p>
              {data?.latitude && data?.longitude && (
                <a
                  className='block mt-4'
                  href={`https://www.google.com/maps?q=${data?.latitude},${data?.longitude}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <span className='font-semibold'>Lien direct Google maps</span>
                </a>
              )}
              {data?.cyanobacteriaAlert && (
                <Text type='alert' className='mt-4'>
                  Présence de cyanobactéries ! *
                </Text>
              )}
              {data?.processionaryCaterpillarAlert && (
                <Text type='alert' className='mt-4'>
                  Présence de chenilles processionnaire ! *
                </Text>
              )}
            </div>
            <div>
              <p className='mt-4 italic font-semibold text-xs'>
                La responsabilité du site ne peut être encourue pour aucun
                dommage ou danger, chacun est responsable de son propre
                bien-être et de ses animaux. *
              </p>

              <p className='mt-1 italic font-semibold text-xs'>
                Merci de respecter les lieux et de ne pas laisser de déchets
                derrière vous. **
              </p>
            </div>
          </div>
        </div>
      </section>

     {/* ///TODO: fix le double appel */}
      <MapContainer slug={slug} title={`${data?.name}`} />
    </>
  );
}

export default DestinationContainer;
