import Image from 'next/image';
import banner from '../../../public/images/banner.jpg';

function Review({name, content}: {name: string, content: string}): JSX.Element {
  return (
    <div className='flex items-center'>
      <Image
        className='w-40 h-40 rounded-full object-cover border-4 border-white'
        src={banner}
        alt='banner'
        placeholder='blur'
        quality={100}
      />
      <div className='pl-4'>
        <p className='text-white font-bold text-2xl'>{name}</p>
        <p className='text-white'>
          « {content} »
        </p>
      </div>
    </div>
  );
}

export default Review;
