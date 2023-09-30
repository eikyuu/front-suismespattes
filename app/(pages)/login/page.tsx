'use client';

import Login from '../../components/form/auth/Login';

export default function Page() {
  return (
    <section className='container mx-auto w-11/12 mt-10'>
      <div className='w-full h-full flex items-center justify-center'>
        <div className=' text-white bg-primary rounded-lg w-11/12 md:w-96 h-auto p-10'>
          <Login />
        </div>
      </div>
    </section>
  );
}
