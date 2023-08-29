import Link from 'next/link';
import BlurImage from './blurImage/BlurImage';
import Button from './button/Button';
import TextBold from './text/TextBold';
import TextGray from './text/TextGray';

function CardDestination({
  city,
  name,
  description,
  slug,
  imageName,
}: {
  city: string;
  name: string;
  description: string;
  slug: string;
  imageName: string;
}): JSX.Element {
  const elipsis = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  };

  return (
    <Link
      href={`destination/${slug}`}
      className='flex flex-col justify-between w-auto mb-4 xs:last:mb-0 md:w-72 lg:w-72 xl:w-72 focus:ring-4 focus:ring-tertiary focus:outline-none '
    >
      <picture className='mb-2'>    
        <BlurImage 
        height='h-72'
        alt={`Image de la destination ${name} a ${city}`}
        image={`${process.env.NEXT_PUBLIC_API_URL}walks/images/${imageName}`} />
      </picture>
      <div className='mb-2'>
        <TextBold text={elipsis(name, 30)} color='text-black lowercase first-letter:uppercase' />
      </div>
      <div className="mb-2">
        <TextBold text={elipsis(city, 30)} color='text-black lowercase first-letter:uppercase' />
      </div>
      <div className='mb-2'>
        <TextGray text={elipsis(description, 100)} />
      </div>      
      <Button text='Découvrir' />
    </Link>
  );
}

export default CardDestination;
