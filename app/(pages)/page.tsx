'use client';

import { useState } from 'react';
import Banner from '../../ui/atoms/banner/banner';
import ContentNavigation from '../../ui/molecules/contentNavigation/contentNavigation';
import Presentation from '../../ui/organisms/presentation/presentation';
import Reviews from '../../ui/organisms/reviews/reviews';
import { useFetchData } from '../../@core/hooks/useFetchData';
import LargeTitle from '../../ui/atoms/largeTitle/largeTitle';
import CardWalk from '../../ui/molecules/cardWalk/cardWalk';

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
    <main>
      <ContentNavigation />
      <Banner />
      <Presentation />
      <Reviews reviews={reviews} />
      <section className='h-full flex flex-col justify-evenly md:h-128'>
        <LargeTitle title='Les dernieres balade' />
        <div className='container mx-auto flex flex-col justify-around md:flex-row'>
          {dogWalk.slice(0, 4).map((dogWalk: any) => (
            <CardWalk key={dogWalk.id} city={dogWalk.city} description={dogWalk.description} />
          ))}
        </div>
      </section>
    </main>
  );
} 
