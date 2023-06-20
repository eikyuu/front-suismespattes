import Image from 'next/image';
import banner from '../../../public/images/banner.jpg';
import TextBold from '../../atoms/textBold/textBold';
import Link from 'next/link';
import TextGray from '../../atoms/textGray/textGray';
import Button from '../../atoms/button/button';
function CardWalk({
  city,
  description,
  slug,
}: {
  city: string;
  description: string;
  slug: string;
}): JSX.Element {
  const elipsis = (text: string) => {
    return text.length > 100 ? text.slice(0, 100) + '...' : text;
  };

  return (
    <Link
      href={`balade/${slug}`}
      prefetch={true}
      className='flex flex-col justify-between w-auto mb-4 xs:last:mb-0 md:w-72 lg:w-52 xl:w-72'
    >
      <picture className='mb-4'>
        <Image
          className='h-56 rounded-lg object-cover'
          src={banner}
          alt='banner'
          placeholder='blur'
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
