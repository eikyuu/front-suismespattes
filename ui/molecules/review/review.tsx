import Image from 'next/image';
import BoldText from '../../atoms/textBold/textBold';
import TextWithQuote from '../../atoms/textWithQuote/textWithQuote';
interface ReviewProps {
  name: string;
  content: string;
  image: string;
}
function Review({ name, content, image }: ReviewProps): JSX.Element {
  return (
    <div className='container flex flex-col w-full items-center xl:flex-row'>
      <Image
        className='w-48 h-48 rounded-full object-cover border-8 border-white'
        src={image}
        alt='Profile picture of {name}'
        width={200}
        height={300}
      />
      <div className=' mx-auto w-11/12 lg:ml-4 md:w-48'>
        <BoldText text={name} />
        <TextWithQuote content={content} />
      </div>
    </div>
  );
}
export default Review;
