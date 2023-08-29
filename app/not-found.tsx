import Link from 'next/link';
import BlurImage from './components/blurImage/BlurImage';

export default function NotFound() {
  return (
    <div className='container mx-auto flex flex-col justify-center items-center w-11/12 md:w-1/2'>
      <h2 className='text-3xl font-bold mt-10 mb-10'>
        &#128561; 404 Page non trouvée &#128561;
      </h2>

      <p className='text-center mb-10'>
        Pourquoi les chiens détestent-ils les pages 404 ? Parce qu&apos;ils
        préfèrent les pages &quot;au poil&quot; ! 🐶📄
      </p>

      <BlurImage
        height='h-96'
        image={'/images/corgi.jpg'}
        alt='Une image de corgi'
      />

      <Link className='mt-10' href='/'>
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
