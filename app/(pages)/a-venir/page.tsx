'use client';

import constuction from '../../../public/images/en-construction.jpg';
import BlurImage from '../../components/blurImage/BlurImage';

export default function Page() {

  return (
    <main>
      <section className='container mx-auto mt-10'>
        <div className='flex flex-col justify-center items-center mx-auto w-11/12'>
          <p className='text-center mb-10'>Page en cours de construction !</p>
          <BlurImage image={constuction} height='h-96' alt="Deux personnage en jouets qui imite un chantier" />
        </div>
      </section>
    </main>
  );
}
