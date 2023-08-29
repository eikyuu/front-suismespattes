'use client';

import Link from 'next/link';
import constuction from '../../../public/images/en-construction.jpg';
import BlurImage from '../../components/blurImage/BlurImage';

export default function Page() {

  return (
        <div className='container mx-auto flex flex-col justify-center items-center w-11/12 md:w-1/2'>
          <h2 className='text-3xl font-bold mt-10 mb-10'>🚧 Page en cours de construction  🚧</h2>
          <BlurImage image={constuction} height='h-96' alt="Deux personnage en jouets qui imite un chantier" />

          <Link className='mt-10' href='/'>
            Retour à l&apos;accueil
          </Link>
        </div>
  );
}
