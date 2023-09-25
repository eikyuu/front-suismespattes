import Link from 'next/link';
import BlurImage from './blurImage/BlurImage';
import Button from './button/Button';
import { Country } from '../../@core/enum/Country';
import Text from './text/Text';
//import { HeartIcon } from '@heroicons/react/24/outline';

function CardDestination({
  destination,
}: {
  destination: {
    name: string;
    city: string;
    country: keyof typeof Country;
    postalCode: string;
    slug: string;
    images: [
      {
        name: string;
      }
    ];
    category: {
      name: string;
    };
    isFavorite: boolean;
    user : {
      isAdmin: boolean
    }
  };
}): JSX.Element {
  const elipsis = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  };

  return (
    <Link
      href={`destination/${destination.slug}`}
      className='flex flex-col justify-between w-auto max-w-md mb-4 xs:last:mb-0 md:w-72 focus:ring-4 focus:ring-tertiary focus:outline-none '
    >
      <picture className='mb-2'>
        <div className='absolute z-10 flex flex-row justify-between items-start w-full md:w-72 p-2'>
          <div className='flex flex-col justify-between'>
            {!destination.user.isAdmin && (
              <Button className='bg-tertiary hover:bg-primary mr-2 bg-opacity-80 mb-2'>
                PARTAGÉ PAR UN CANIPOTE
              </Button>
            )}

            {destination.isFavorite && (
              <Button className='bg-opacity-80'>COUP DE COEUR</Button>
            )}
          </div>
          {/* <Button className='bg-opacity-80 h-10'>
            <HeartIcon className='w-5 h-5' />
          </Button> */}
        </div>

        <BlurImage
          height='h-72'
          alt={`Image de la destination ${destination.name} a ${destination.city}`}
          image={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${destination.images[0]?.name}`}
        />
      </picture>
      <div className='mb-1'>
        <Text
          type='bold'
          className='text-black lowercase first-letter:uppercase'
        >
          {elipsis(destination.name, 30)}
        </Text>
        <Text
          type='gray'
          className='uppercase'
        >
          {`${destination.city}, (${destination.postalCode.slice(0, 2 )}), ${Country[destination.country]}`}
        </Text>
        <Text 
          type='gray' 
          className='uppercase' 
        >
          {destination.category.name}
        </Text>
      </div>
      <Button>DÉCOUVRIR</Button>
    </Link>
  );
}

export default CardDestination;
