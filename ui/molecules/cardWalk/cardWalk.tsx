import Image from 'next/image';
import banner from '../../../public/images/banner.jpg';
import TextBold from '../../atoms/textBold/textBold';
import TextGray from '../../atoms/textGray/textGray';
import Link from 'next/link';
function CardWalk({city, description, slug}: {city: string, description: string, slug: string}): JSX.Element {

  return (
    <Link href={`balade/${slug}`}  prefetch={true} className='flex flex-col justify-between mx-auto w-11/12 h-80 mb-10 last:mb-0 md:w-72'>
      <picture>
        <Image
          className='h-56 rounded-xl object-cover'
          src={banner}
          alt='banner'
          placeholder='blur'
        />
      </picture>
      <TextBold text={city} color='text-black' />
      <TextGray text={description} />
      <button className='w-max pr-2 pl-2 bg-primary text-white rounded-lg'>Découvrir</button>
    </Link>
  );
}

export default CardWalk;
