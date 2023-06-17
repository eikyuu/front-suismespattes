'use client';
import { useState } from 'react';
import { useFetchData } from '../../../@core/hooks/useFetchData';
import LargeTitle from '../../atoms/largeTitle/largeTitle';
import CardWalk from '../../molecules/cardWalk/cardWalk';

function PageWalk() {
    const [dogWalk, setDogWalk] = useState([]);

    useFetchData(
      'https://my-json-server.typicode.com/eikyuu/db/dogWalk',
      setDogWalk
    );
  
    return ( 
        <section className='h-full flex flex-col justify-evenly pt-10 pb-10'>
        <LargeTitle title='Les dernieres balade' />
        <div className='container mx-auto flex flex-col flex-wrap justify-between pt-10 md:flex-row'>
          {dogWalk.map((dogWalk: any) => (
            <CardWalk
              key={dogWalk.id}
              city={dogWalk.city}
              description={dogWalk.description}
              slug={dogWalk.slug}
            />
          ))}
        </div>
      </section>
     );
}

export default PageWalk;