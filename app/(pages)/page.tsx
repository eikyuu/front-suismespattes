'use client';

import { useState } from 'react';
import Presentation from '../../ui/organisms/presentation/presentation';
import Reviews from '../../ui/molecules/reviews/reviews';
import { useFetchData } from '../../@core/hooks/useFetchData';
import LastWalk from '../../ui/organisms/lastWalk/lastWalk';
import 'leaflet/dist/leaflet.css';
import MediumTitle from '../../ui/atoms/mediumTitle/mediumTitle';
import MapWalk from '../../ui/molecules/mapWalk/mapWalk';


export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [dogWalk, setDogWalk] = useState([]);

  useFetchData(
    'https://my-json-server.typicode.com/eikyuu/db/review',
    setReviews
  );
  
  useFetchData(
    'https://my-json-server.typicode.com/eikyuu/db/dogWalk',
    setDogWalk
  );

  return (
    <main className='font-sans'>
      <Presentation />
      <Reviews reviews={reviews} />
      <LastWalk dogWalk={dogWalk} />
      <section className='bg-primary h-full mx-auto pt-10 pb-10 flex flex-col md:justify-evenly'>
        <MediumTitle
          title='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.'
          color='text-white'
        />
        <div className='container mx-auto pt-10 w-11/12 md:w-1/2'>
          <MapWalk dogWalk={dogWalk}  />
        </div>
      </section>
    </main>
  );
}