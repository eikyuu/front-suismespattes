import Image from 'next/image';
import banner from '../../../public/images/banner.jpg';
import BoldText from '../../atoms/textBold/textBold';
import TextWithQuote from '../../atoms/textWithQuote/textWithQuote';
interface ReviewProps {
  name: string;
  content: string;
}
function Review({ name, content }: ReviewProps): JSX.Element {
  return (
    <div className='flex flex-col w-full items-center xl:flex-row'>
      <Image
        className='w-48 h-48 rounded-full object-cover border-8 border-white'
        src={banner}
        alt='Profile picture of {name}'
        placeholder='blur'
        quality={100}
      />
      <div className=' mx-auto w-11/12 lg:ml-4 md:w-48'>
        <BoldText text={name} />
        <TextWithQuote content={content} />
      </div>
    </div>
  );
}
export default Review;
