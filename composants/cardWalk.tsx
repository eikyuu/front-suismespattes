import Link from 'next/link';
import BlurImage from './blurImage/blurImage';
import Button from './button/button';
import TextBold from './text/textBold';
import TextGray from './text/textGray';

function CardWalk({
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
      href={`balade/${slug}`}
      className='flex flex-col justify-between w-auto mb-4 xs:last:mb-0 md:w-72 lg:w-52 xl:w-72 focus:ring-4 focus:ring-tertiary focus:outline-none '
    >
      <picture className='mb-4'>    
        <BlurImage 
        height='h-80'
        alt={`Image de la balade ${name} a ${city}`}
        image={`${process.env.NEXT_PUBLIC_API_URL}walks/images/${imageName}`} />
      </picture>
      <div className='mb-4'>
        <TextBold text={elipsis(name, 30)} color='text-black' />
      </div>
      <div className="mb-4">
        <TextBold text={elipsis(city, 30)} color='text-black' />
      </div>
      <div className='mb-4'>
        <TextGray text={elipsis(description, 100)} />
      </div>      <Button text='Découvrir' />
    </Link>
  );
}

export default CardWalk;
