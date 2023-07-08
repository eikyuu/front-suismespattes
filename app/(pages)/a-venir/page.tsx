'use client';

import Image from 'next/image';
import constuction from '../../../public/images/en-construction.jpg';

export default function Page() {

  return (
    <main className='font-sans'>
      <section className='container mx-auto mt-10'>
        <div className='flex flex-col justify-center items-center mx-auto w-11/12'>
          <p className='text-center mb-10'>Page en cours de construction !</p>
          <Image src={constuction} width={500} height={500} alt=''/>
        </div>
      </section>
    </main>
  );
}
