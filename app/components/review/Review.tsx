import BlurImageRounded from '../blurImage/BlurImageRounded';
import TextBold from '../text/TextBold';
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
        <TextBold text={name} />
        <TextWithQuote content={content} />
      </div>
    </div>
  );
}
export default Review;
