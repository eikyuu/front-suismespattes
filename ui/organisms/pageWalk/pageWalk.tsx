'use client';
import { useCallback, useEffect, useState } from 'react';
import LargeTitle from '../../atoms/largeTitle/largeTitle';
import CardWalk from '../../molecules/cardWalk/cardWalk';
import React from 'react';
import LoaderWalks from '../../molecules/Loader/LoaderWalks';
import { useFetch } from '../../../@core/hooks/useFetch';
import { API_URL } from '../../../@core/constants/global';

function PageWalk() {
  const [dogWalk, setDogWalk] = useState<any[]>([]);
  const [filteredDogWalk, setFilteredDogWalk] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const url = `${API_URL}walks`;

  const { data, error } = useFetch<any[]>(url)

  useEffect(() => {
    if (data) {
      setDogWalk(data);
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  const filterDogWalk = useCallback(() => {
    setFilteredDogWalk(
      dogWalk.filter((walk) => {
        return walk.city.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [dogWalk, search]);

  useEffect(() => {
    filterDogWalk();
  }, [search, filterDogWalk]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <section className='h-full flex flex-col justify-evenly pt-10 pb-10'>
      <LargeTitle title='Toutes les balades' />

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
          className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
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
              imageName={walk.images[0]?.name}
            />
          )
        )}
      </div>
    </section>
  );
}
export default PageWalk;
