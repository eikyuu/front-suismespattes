import Image from 'next/image';
import banner from '../../../public/images/banner.jpg';
import TextBold from '../../atoms/textBold/textBold';
import Link from 'next/link';
import TextGray from '../../atoms/textGray/textGray';
function CardWalk({city, description, slug}: {city: string, description: string, slug: string}): JSX.Element {

  const elipsis = (text: string) => {
    return text.length > 100 ? text.slice(0, 100) + '...' : text;
  };

  return (
    <Link href={`balade/${slug}`}  prefetch={true} className='flex flex-col justify-between mx-auto w-auto h-96 xs:last:mb-0 md:w-72'>
      <picture>
        <Image
          className='h-56 rounded-xl object-cover'
          src={banner}
          alt='banner'
          placeholder='blur'
        />
      </picture>
      <TextBold text={city} color='text-black' />
      <TextGray text={elipsis(description)} />
      <button className='w-max p-2 bg-primary text-white rounded-lg'>Découvrir</button>
    </Link>
  );
}

export default CardWalk;
