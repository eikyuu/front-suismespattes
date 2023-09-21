import Text from './text/Text';
import Title from './text/Title';

function PresentationContent({ title, text }: { title: string; text: string }): JSX.Element {
  return (
    <div className=''>
      <Title title={title} balise='h2' />
      <Text type='gray' text={text} />
    </div>
  );
}

export default PresentationContent;
