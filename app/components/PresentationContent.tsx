import TextGray from './text/TextGray';
import Title from './text/Title';

function PresentationContent({ title, text }: { title: string; text: string }): JSX.Element {
  return (
    <div className=''>
      <Title title={title} balise='h2' />
      <TextGray text={text} />
    </div>
  );
}

export default PresentationContent;
