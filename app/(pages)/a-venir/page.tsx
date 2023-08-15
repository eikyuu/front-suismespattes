'use client';

import constuction from '../../../public/images/en-construction.jpg';
import BlurImage from '../../../ui/molecules/blurImage/blurImage';

export default function Page() {

  return (
    <main className='font-sans'>
      <section className='container mx-auto mt-10'>
        <div className='flex flex-col justify-center items-center mx-auto w-11/12'>
          <p className='text-center mb-10'>Page en cours de construction !</p>
          <BlurImage image={constuction}/>
        </div>
      </section>
    </main>
  );
}
