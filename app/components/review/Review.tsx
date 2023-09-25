import BlurImageRounded from '../blurImage/BlurImageRounded';
import Text from '../text/Text';
import TextWithQuote from '../text/TextWithQuote';

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
        <Text type='bold' className='text-white'>
          {name}
        </Text>
        <TextWithQuote content={content} />
      </div>
    </div>
  );
}
export default Review;
