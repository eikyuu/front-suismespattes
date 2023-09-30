'use client';
import { use, useCallback, useEffect, useRef, useState } from 'react';
import CardDestination from './CardDestination';
import LoaderDestinations from './loader/LoaderDestinations';
import { API_URL } from '../../@core/constants/global';
import Title from './text/Title';
import Loader from './loader/Loader';
import { Destination, Destinations } from '../../@core/types/DestinationForm';
import InfiniteScroll from 'react-infinite-scroll-component';
import toast from 'react-hot-toast';

function Destinations() {
  const [filteredDogDestination, setFilteredDogDestination] = useState<
    Destination[]
  >([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [destinations, setDestinations] = useState<Destinations>({
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPages: 0,
    },
  })

  const url = `${API_URL}destination?page=${page}&limit=10`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPage(prevPage => prevPage + 1);

      setDestinations(prevDestinations => ({
        ...prevDestinations,
        data: [...prevDestinations.data, ...data.data],
        pagination: {
          ...prevDestinations.pagination,
          limit: data.pagination.limit,
          page: data.pagination.page,
          total: data.pagination.total,
          totalPages: data.pagination.totalPages
        }
      }))

    } catch (error) {
      toast.error('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHasMore(destinations.pagination.total > destinations.data.length);
  }, [destinations]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const filterDogDestination = useCallback(() => {
    setFilteredDogDestination(
      destinations.data.filter((walk) => {
        return walk.city
          .toLowerCase()
          .replace(/-/g, ' ')
          .normalize("NFD").replace(/\p{Diacritic}/gu, "")
          .includes(search.toLowerCase().replace(/-/g, ' '))
          || 
          walk.name
          .toLowerCase()
          .replace(/-/g, ' ')
          .normalize("NFD").replace(/\p{Diacritic}/gu, "")
          .includes(search.toLowerCase().replace(/-/g, ' ')) 
          ||
          walk.category.name
          .toLowerCase()
          .replace(/-/g, ' ')
          .normalize("NFD").replace(/\p{Diacritic}/gu, "")
          .includes(search.toLowerCase().replace(/-/g, ' '))
      })
    );
  }, [destinations, search]);

  useEffect(() => {
    filterDogDestination();
  }, [search, filterDogDestination]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <section className='h-full flex flex-col justify-evenly pt-10 w-11/12 mx-auto'>
      <Title balise='h1' className='text-center'>
        Toutes les destinations
      </Title>

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
          <span className='sr-only'>Icon de recherche</span>
        </div>
        <input
          type='text'
          id='search-navbar'
          className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
          placeholder='Trouve une destination par ville, nom ou catégorie'
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={filteredDogDestination.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            {loading && <Loader />}
          </div>
        }
        endMessage={
          destinations.pagination.total === filteredDogDestination.length && (
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              <b>Vous avez atteint la fin de la liste</b>
            </p>
          )
        }
      >
        <div className='container mx-auto flex flex-col flex-wrap justify-between pt-10 md:flex-row'>
          {filteredDogDestination.length === 0 && <LoaderDestinations />}
          {filteredDogDestination
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((destination: any) => (
              <CardDestination key={destination.id} destination={destination} />
            ))}
        </div>
      </InfiniteScroll>
    </section>
  );
}
export default Destinations;
