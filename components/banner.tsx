import Image from 'next/image';
import banner from '@/public/images/banner.webp';
import Link from 'next/link';

function Banner() {
  return (
    <Link href='/' role='bannière'>
      <Image
        className='w-full h-1/2 object-cover md:h-96 lg:h-1/2 xl:h-160 '
        src={banner}
        alt='Un chien debout sur un banc en bois, regardant au loin avec un arrière plan de montagnes et de forêts.'
        loading='eager'
        priority={true}
      />
    </Link>
  );
}

export default Banner;