import Image from 'next/image';
import PresentationContent from './presentation-content';
import Text from '../ui/text/Text';

function PresentationBloc({className, title, text, image, next, width, height }: {className?: string; title: string; text: string; image: string, next: boolean, width: number, height: number }): JSX.Element {
  return (
    <div className={`${className} flex flex-col xl:h-full`}>
      <Image
        src={image}
        alt='Logo en forme de tête de chien'
        className='self-center mb-10 mt-10'
        loading='eager'
        width={width}
        height={height}
      />
      <PresentationContent
        title={title}
        text={text}
      />
      {next && <Text className='text-secondary'>Prochainement</Text>}
    </div>
  );
}

export default PresentationBloc;
