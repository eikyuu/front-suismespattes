import Image from 'next/image';
import banner from '../../../public/images/banner.jpg';
import TextWithQuote from '../../atoms/TextWithQuote/textWithQuote';
import BoldText from '../../atoms/textBold/textBold';

function Review({name, content}: {name: string, content: string}): JSX.Element {
  return (
    <div className='flex items-center'>
      <Image
        className='w-48 h-48 rounded-full object-cover border-8 border-white'
        src={banner}
        alt='banner'
        placeholder='blur'
        quality={100}
      />
      <div className='pl-4'>
        <BoldText text={name} />
        <TextWithQuote content={content} />
      </div>
    </div>
  );
}

export default Review;
