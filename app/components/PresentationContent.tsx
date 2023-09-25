import Text from './text/Text';
import Title from './text/Title';

function PresentationContent({ title, text }: { title: string; text: string }): JSX.Element {
  return (
    <div className=''>
      <Title balise='h2'>
        {title}
      </Title>
      <Text type='gray'>
        {text}
      </Text>
    </div>
  );
}

export default PresentationContent;
