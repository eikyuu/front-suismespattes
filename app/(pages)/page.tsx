'use client';

import { useState } from 'react';
import Banner from '../../ui/atoms/banner/banner';
import ContentNavigation from '../../ui/molecules/contentNavigation/contentNavigation';
import Presentation from '../../ui/organisms/presentation/presentation';
import Reviews from '../../ui/molecules/reviews/reviews';
import { useFetchData } from '../../@core/hooks/useFetchData';
import LastWalk from '../../ui/organisms/lastWalk/lastWalk';
import LargeTitle from '../../ui/atoms/largeTitle/largeTitle';

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
      <ContentNavigation />
      <Banner />
      <Presentation />
      <Reviews reviews={reviews} />
      <LastWalk dogWalk={dogWalk} />
      <section className='bg-primary h-full mx-auto pt-4 pb-4 flex flex-col md:h-128 md:justify-evenly md:pt-0 md:pb-0'>
        <LargeTitle title='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.' />
      </section>

    </main>
  );
} 
