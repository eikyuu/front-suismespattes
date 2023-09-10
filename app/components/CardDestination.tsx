import Link from 'next/link';
import BlurImage from './blurImage/BlurImage';
import Button from './button/Button';
import TextBold from './text/TextBold';
import TextGray from './text/TextGray';
import { Country } from '../../@core/enum/Country';

function CardDestination({
  city,
  name,
  postalCode,
  country,
  slug,
  imageName,
  category
}: {
  city: string;
  name: string;
  postalCode: string;
  country: keyof typeof Country;
  slug: string;
  imageName: string;
  category: string;
}): JSX.Element {
  const elipsis = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  };
console.log(category);
  return (
    <Link
      href={`destination/${slug}`}
      className='flex flex-col justify-between w-auto mb-4 xs:last:mb-0 md:w-72 lg:w-72 xl:w-72 focus:ring-4 focus:ring-tertiary focus:outline-none '
    >
      <picture className='mb-2'>    
        <BlurImage 
        height='h-72'
        alt={`Image de la destination ${name} a ${city}`}
        image={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${imageName}`} />
      </picture>
      <div className='mb-1'>
        <TextBold text={elipsis(name, 30)} color='text-black lowercase first-letter:uppercase' />
        <TextGray text={`${city}, (${postalCode.slice(0, 2)}), ${Country[country]}`} /> 
        <TextGray text={category} /> 
      </div>
      <Button text='Découvrir' />
    </Link>
  );
}

export default CardDestination;
