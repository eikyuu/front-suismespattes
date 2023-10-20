'use client';

import Link from 'next/link';
import constuction from '../../../public/images/en-construction.webp';
import BlurImage from '@/components/blurImage/blur-image';
import Title from '@/components/ui/text/Title';

export default function Page() {
  return (
    <section className='container mx-auto flex flex-col justify-center items-center w-11/12 md:w-1/2'>
      <Title className='text-center mb-10 mt-10' balise='h1'>
        🚧 Page en cours de construction 🚧
      </Title>
      <BlurImage
        image={constuction}
        height='h-96'
        alt='Deux personnage en jouets qui imite un chantier'
      />

      <Link className='mt-10' href='/'>
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
