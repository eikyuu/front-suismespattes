import Image from 'next/image';
import banner from '../../../public/images/banner.jpg';

function Banner() {
    return ( 
        <Image 
            className='w-full h-160 object-cover'
            src={banner} 
            alt='banner'
            placeholder="blur"
            quality={100}

        />
     );
}

export default Banner;