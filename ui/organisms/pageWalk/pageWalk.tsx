'use client';
import { useId, useState } from 'react';
import { useFetchData } from '../../../@core/hooks/useFetchData';
import LargeTitle from '../../atoms/largeTitle/largeTitle';
import CardWalk from '../../molecules/cardWalk/cardWalk';
import React from 'react';
import LoaderWalks from '../../molecules/Loader/LoaderWalks';


const API_ENDPOINT = 'https://au-fil-des-pattes.up.railway.app/walks';
function PageWalk() {
  const [dogWalk, setDogWalk] = useState([]);
  const [search, setSearch] = useState("");

  useFetchData(API_ENDPOINT, setDogWalk);

// filtered dogWalk by value of input search with debounce
  const filteredDogWalk = dogWalk.filter((walk: { city: string, name: string }) => {
    return walk.city.toLowerCase().includes(search.toLowerCase());
  });

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <section className='h-full flex flex-col justify-evenly pt-10 pb-10'>
      <LargeTitle title='Les dernieres balade' />

      <div className='container relative block mt-10 mx-auto'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            className='w-5 h-5 text-gray-500'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            ></path>
          </svg>
          <span className='sr-only'>Search icon</span>
        </div>
        <input
          type='text'
          id='search-navbar'
          className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Trouve une balade par ville'
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className='container mx-auto flex flex-col flex-wrap justify-between pt-10 md:flex-row'>
        {filteredDogWalk.length === 0 && <LoaderWalks />}
        {filteredDogWalk.map(
          (walk: {
            id: number;
            city: string;
            description: string;
            slug: string;
            images: { name: string }[];
          }) => (
            <CardWalk
              key={walk.id}
              city={walk.city}
              description={walk.description}
              slug={walk.slug}
              imageName={walk.images[0].name}
            />
          )
        )}
      </div>
    </section>
  );
}
export default PageWalk;
