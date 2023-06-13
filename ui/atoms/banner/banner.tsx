import Image from 'next/image';
import banner from '../../../public/images/banner.jpg';
import Link from 'next/link';

function Banner() {
  return (
    <Link href='/' prefetch={false}>
      <Image
        className='w-full h-160 object-cover'
        src={banner}
        alt='banner'
        placeholder='blur'
        quality={100}
      />
    </Link>
  );
}

export default Banner;
