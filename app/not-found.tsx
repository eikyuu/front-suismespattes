import Link from 'next/link';
import BlurImage from './components/blurImage/BlurImage';
import Title from './components/text/Title';
import Text from './components/text/Text';

export default function NotFound() {
  return (
    <section className='container mx-auto flex flex-col justify-center items-center w-11/12 md:w-1/2'>

      <Title className='text-center mt-10' balise='h1'>
        &#128561; 404 Page non trouvée &#128561;
      </Title>

      <Text type='gray' className='mt-10 mb-10'>
        Pourquoi les chiens détestent-ils les pages 404 ? Parce qu&apos;ils préfèrent les pages &quot;au poil&quot; ! 🐶📄
      </Text>

      <BlurImage
        height='h-96'
        image={'/images/corgi.jpg'}
        alt='Une image de corgi'
      />

      <Link className='mt-10' href='/'>
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
