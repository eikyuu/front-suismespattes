import Link from 'next/link';
import BlurImage from './blurImage/blur-image';
import { Button } from '@/components/ui/button';
import { Country } from '../@core/enum/Country';
import Text from '@/components/ui/text/Text';
//import { HeartIcon } from '@heroicons/react/24/outline';

function CardDestination({
  destination,
  height = 'h-40 md:h-72',
}: {
  destination: {
    name: string;
    city: {
      label: string;
      departmentCode: string;
    }
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
  height?: string;
}): JSX.Element {
  const elipsis = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  };

  return (
    <Link
      href={`destination-chien-accepte/${destination.slug}`}
      className='flex flex-col justify-between w-full md:w-72 h-full xs:last:mb-0 focus:ring-4 focus:ring-tertiary focus:outline-none '
    >
      <picture className='mb-2'>
        <div className='absolute z-10 flex flex-row justify-between items-start px-2 py-2 md:p-2' >
          <div className='flex flex-col justify-between'>
            {!destination.user.isAdmin && (
              <Button className='bg-tertiary hover:bg-primary bg-opacity-80 text-[8px] min-[425px]:text-[12px] p-1 h-auto md:p-2 md:h-10 md:text-sm'>
                PARTAGÉ PAR UN CANIPOTE
              </Button>
            )}

            {destination.isFavorite && (
              <Button className='bg-tertiary hover:bg-primary bg-opacity-80 text-[8px] min-[425px]:text-[12px] p-1 h-auto md:p-2 md:h-10 md:text-sm mt-2'>COUP DE COEUR</Button>
            )}
          </div>
          {/* <Button className='bg-opacity-80 h-10'>
            <HeartIcon className='w-5 h-5' />
          </Button> */}
        </div>

        <BlurImage
          height={height}
          alt={`Image de la destination ${destination.name} a ${destination.city}`}
          image={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${destination.images[0]?.name}`}
        />
      </picture>
      <div className='mb-1'>
        <Text
          type='bold'
          className='text-black lowercase first-letter:uppercase text-sm md:text-base'
        >
          {elipsis(destination.name, 20)}
        </Text>
        <Text
          type='gray'
          className='uppercase text-sm md:text-base'
        >
          {`${destination.city.label}, (${destination.city.departmentCode}), ${Country[destination.country]}`}
        </Text>
        <Text 
          type='gray' 
          className='uppercase text-sm md:text-base' 
        >
          {destination.category.name}
        </Text>
      </div>
      <Button variant='default' className='w-max text-[8px] min-[425px]:text-[12px] p-1 h-auto md:p-2 md:h-10 md:text-sm' >DÉCOUVRIR</Button>
    </Link>
  );
}

export default CardDestination;
