import SmallTitle from './text/smallTitle';
import TextGray from './text/textGray';

function Card({ title, text }: { title: string; text: string }): JSX.Element {
  return (
    <div className=''>
      <SmallTitle title={title} />
      <TextGray text={text} />
    </div>
  );
}

export default Card;
