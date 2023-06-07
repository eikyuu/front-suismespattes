import GrayParagraphe from '../../atoms/grayParagraphe/grayParagraphe';
import SmallTitle from '../../atoms/smallTitle/smallTitle';

function Card({ title, text }: { title: string; text: string }): JSX.Element {
  return (
    <div className=''>
      <SmallTitle title={title} />
      <GrayParagraphe text={text} />
    </div>
  );
}

export default Card;
