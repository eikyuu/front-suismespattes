import Image from 'next/image';
import banner from '../../../public/images/banner.jpg';
import Link from 'next/link';

function Banner() {
  return (
    <Link href='/' prefetch={false}>
      <Image
        className='w-full h-1/2 object-cover md:h-96 lg:h-1/2 xl:h-1/2 2xl:h-1/2'
        src={banner}
        alt='banner'
        placeholder='blur'
        quality={100}
      />
    </Link>
  );
}

export default Banner;
