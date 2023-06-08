import SmallTitle from '../../atoms/smallTitle/smallTitle';
import TextGray from '../../atoms/textGray/textGray';

function Card({ title, text }: { title: string; text: string }): JSX.Element {
  return (
    <div className=''>
      <SmallTitle title={title} />
      <TextGray text={text} />
    </div>
  );
}

export default Card;
