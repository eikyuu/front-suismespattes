'use client';
import { useId, useState } from 'react';
import { useFetchData } from '../../../@core/hooks/useFetchData';
import LargeTitle from '../../atoms/largeTitle/largeTitle';
import CardWalk from '../../molecules/cardWalk/cardWalk';
import ContentLoader from 'react-content-loader';
import React from 'react';
import Loader from '../../molecules/Loader/Loader';
 const API_ENDPOINT = 'https://my-json-server.typicode.com/eikyuu/db/dogWalk';
 function PageWalk() {
  const [dogWalk, setDogWalk] = useState([]);
   useFetchData(API_ENDPOINT, setDogWalk);

   return ( 
    <section className='h-full flex flex-col justify-evenly pt-10 pb-10'>
      <LargeTitle title='Les dernieres balade' />
      <div className='container mx-auto flex flex-col flex-wrap justify-between pt-10 md:flex-row'>
        {dogWalk.length === 0 && <Loader />}
        {dogWalk.map((walk: {id: number, city: string, description: string, slug: string}) => (
          <CardWalk
            key={walk.id}
            city={walk.city}
            description={walk.description}
            slug={walk.slug}
          />
        ))}
      </div>
    </section>
  );
}
 export default PageWalk;