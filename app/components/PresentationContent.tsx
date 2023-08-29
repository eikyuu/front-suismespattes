import SmallTitle from './text/SmallTitle';
import TextGray from './text/TextGray';

function PresentationContent({ title, text }: { title: string; text: string }): JSX.Element {
  return (
    <div className=''>
      <SmallTitle title={title} />
      <TextGray text={text} />
    </div>
  );
}

export default PresentationContent;
