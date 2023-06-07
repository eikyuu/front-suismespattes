import Image from 'next/image';
import GrayParagraphe from '../../atoms/grayParagraphe/grayParagraphe';
import banner from '../../../public/images/banner.jpg';

function CardWalk({city, description}: {city: string, description: string}): JSX.Element {
  return (
    <div className='w-1/4 mr-10 last:mr-0'>
      <picture>
        <Image
          className='h-56 rounded-xl object-cover'
          src={banner}
          alt='banner'
          placeholder='blur'
          quality={100}
        />
      </picture>
      <p className='font-bold'>{city}</p>
      <GrayParagraphe text={description} />
      <button>En savoir plus</button>
    </div>
  );
}

export default CardWalk;
