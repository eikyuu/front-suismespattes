import Image from 'next/image';
import TextBold from '../../atoms/textBold/textBold';
import Link from 'next/link';
import TextGray from '../../atoms/textGray/textGray';
import Button from '../../atoms/button/button';
function CardWalk({
  city,
  description,
  slug,
  imageName,
}: {
  city: string;
  description: string;
  slug: string;
  imageName: string;
}): JSX.Element {
  const elipsis = (text: string) => {
    return text.length > 100 ? text.slice(0, 100) + '...' : text;
  };

  return (
    <Link
      href={`balade/${slug}`}
       
      className='flex flex-col justify-between w-auto mb-4 xs:last:mb-0 md:w-72 lg:w-52 xl:w-72 focus:ring-4 focus:ring-tertiary focus:outline-none '
    >
      <picture className='mb-4'>    
        <Image
          className='h-56 w-full rounded-lg object-cover'
          src={`${process.env.NEXT_PUBLIC_API_URL}${imageName}`}
          width={500}
          height={500}
          alt='Picture of the author'
        />
      </picture>
      <div className='mb-4'>
        <TextBold text={city} color='text-black' />
      </div>
      <div className='mb-4'>
        <TextGray text={elipsis(description)} />
      </div>
      <Button text='Découvrir' />
    </Link>
  );
}

export default CardWalk;
