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
import { Input } from '@/components/ui/input';

const initialPagination = {
  limit: 10,
  page: 1,
  total: 0,
  totalPages: 1,
};

const initialDestination: Destinations = {
  destinations: [],
  pagination: initialPagination,
};

function Destinations() {
  const [filteredDogDestination, setFilteredDogDestination] = useState<
    Destination[]
  >([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [state, setState] = useState(initialDestination);

  const fetchData = async (page: number) => {
    const url = `${API_URL}destination?page=${page}&limit=10`;
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPage(page);
      setState((prevState: any) => ({
        ...prevState,
        destinations: [...prevState.destinations, ...data.destinations],
        pagination: {
          ...prevState.pagination,
          limit: data.pagination.limit,
          page: data.pagination.page,
          total: data.pagination.total,
          totalPages: data.pagination.totalPages,
        },
      }));
    } catch (error) {
      toast.error('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setHasMore(state.pagination.total > state.destinations.length);
  }, [state.destinations, state.pagination]);

  useEffect(() => {
    fetchData(1);
    return () => {
      setFilteredDogDestination([]);
      setState(initialDestination);
    };
    // eslint-disable-next-line
  }, []);

  const filterDogDestination = useCallback(() => {
    setFilteredDogDestination(
      state.destinations.filter((walk) => {
        return (
          walk.city?.label
            .toLowerCase()
            .replace(/-/g, ' ')
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .includes(search.toLowerCase().replace(/-/g, ' ')) ||
          walk.name
            .toLowerCase()
            .replace(/-/g, ' ')
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .includes(search.toLowerCase().replace(/-/g, ' ')) ||
          walk.category.name
            .toLowerCase()
            .replace(/-/g, ' ')
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .includes(search.toLowerCase().replace(/-/g, ' '))
        );
      })
    );
  }, [state, search]);

  useEffect(() => {
    filterDogDestination();
  }, [search, filterDogDestination]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <section className='h-full flex flex-col justify-evenly pt-10 mx-auto'>
      <Title balise='h1' className='text-center'>
        Toutes les destinations
      </Title>

      <div className='container relative block mt-10 mx-auto'>
        <p>
          À la recherche d&apos;une aventure inoubliable à partager avec votre
          fidèle compagnon canin lors de vos prochaines vacances ? Vous êtes au
          bon endroit.
        </p>
        <p className='mt-10 mb-10'>
          &#128021; &#x26FA; &#x2705; Que vous soyez amateurs de plein air,
          d&apos;exploration ou de découvertes culturelles, il existe une
          myriade d&apos;options pour vous et votre chien. Dites adieu à
          l&apos;idée de laisser votre compagnon à quatre pattes derrière vous,
          car de nombreux endroits vous accueillent à bras ouverts, prêts à vous
          offrir une expérience mémorable ensemble.
        </p>

        <p className='mt-10 mb-10'>
        Partez à l&apos;aventure en
          France avec votre fidèle compagnon canin. Des plages de Normandie aux
          montagnes des Alpes, découvrez ensemble des trésors cachés et vivez
          une escapade inoubliable. 🐾🇫🇷
        </p>

        <Input
          placeholder='Rechercher par nom, ville ou catégorie'
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={state.destinations.length}
        next={() => fetchData(page + 1)}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            {isLoading && <Loader />}
          </div>
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
