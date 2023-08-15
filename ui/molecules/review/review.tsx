import Image from 'next/image';
import BoldText from '../../atoms/textBold/textBold';
import TextWithQuote from '../../atoms/textWithQuote/textWithQuote';
import BlurImage from '../blurImage/blurImage';
import BlurImageRounded from '../blurImage/blurImageRounded';
interface ReviewProps {
  name: string;
  content: string;
  image: string;
}
function Review({ name, content, image }: ReviewProps): JSX.Element {
  return (
    <div className='container flex flex-col w-full items-center xl:flex-row'>
      <BlurImageRounded image={image} alt="Photo d'une personne" />
      <div className=' mx-auto w-11/12 lg:ml-4 md:w-48'>
        <BoldText text={name} />
        <TextWithQuote content={content} />
      </div>
    </div>
  );
}
export default Review;
