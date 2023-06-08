import Image from 'next/image';
import GrayParagraphe from '../../atoms/grayParagraphe/grayParagraphe';
import banner from '../../../public/images/banner.jpg';
import TextBold from '../../atoms/textBold/textBold';

function CardWalk({city, description, slug}: {city: string, description: string, slug: string}): JSX.Element {
  return (
    <a href={`walk/${slug}`} className='flex flex-col justify-between w-1/4 h-80 mr-10 last:mr-0'>
      <picture>
        <Image
          className='h-56 rounded-xl object-cover'
          src={banner}
          alt='banner'
          placeholder='blur'
          quality={100}
        />
      </picture>
      <TextBold text={city} color='text-black' />
      <GrayParagraphe text={description} />
      <button className='w-max pr-2 pl-2 bg-primary text-white rounded-lg'>Découvrir</button>
    </a>
  );
}

export default CardWalk;
