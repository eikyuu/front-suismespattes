import Image from 'next/image';
import banner from '../../../public/images/banner.jpg';
import BoldText from '../../atoms/textBold/textBold';
import Testing from '../../atoms/testing/testing';
interface ReviewProps {
  name: string;
  content: string;
}
function Review({ name, content }: ReviewProps): JSX.Element {
  return (
    <div className='flex items-center'>
      <Image
        className='w-48 h-48 rounded-full object-cover border-8 border-white'
        src={banner}
        alt='Profile picture of {name}'
        placeholder='blur'
        quality={100}
      />
      <div className='pl-4'>
        <BoldText text={name} />
        <Testing content={content} />
      </div>
    </div>
  );
}
export default Review;
