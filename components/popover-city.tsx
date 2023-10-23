import {
    Command, CommandInput
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from './ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { useDebounce } from '../@core/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { fetchCitiesBySearch } from '../@core/services/cityService';
import Loader from './loader/loader';
import { useCreateQueryString } from '../@core/hooks/useCreateQueryString';
import { useRouter } from 'next/navigation';

export default function PopoverCity(): JSX.Element {
  const router = useRouter();
  const [openCities, setOpenCities] = useState(false);
  const [valueCities, setValueCities] = useState('');
  const [value, setValue] = useState('');

  const { pathname, searchParam, createQueryString } =
    useCreateQueryString('city');

  const debouncedValue = useDebounce<string>(value, 500);

  const handleChange = (event: string) => {
    setValue(event);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['cities', debouncedValue],
    queryFn: async () => {
      if (debouncedValue.length >= 3) {
        return await fetchCitiesBySearch(debouncedValue);
      } else {
        return Promise.resolve([]); // Return an empty array if the search value is less than 3 characters
      }
    },
    staleTime: 500,
  });

  useEffect(() => {
    if (searchParam === null) {
      setValueCities('');
    }
  }, [searchParam]);

  return (
    <Fragment>
      <Popover open={openCities} onOpenChange={setOpenCities}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={openCities}
            className='w-full md:w-[260px] justify-between'
          >
            {valueCities ? valueCities : 'Rechercher par ville'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='md:w-[260px] p-0 overflow-auto max-h-[20rem]'>
          <Command>
            <CommandInput
              placeholder='Rechercher une ville'
              onValueChange={(e) => handleChange(e)}
            />
            {isLoading && <Loader />}
            {data &&
              data.length > 0 &&
              data.map((city: any) => (
                <p
                  className='capitalize ml-2 py-2 cursor-pointer'
                  key={city.id}
                  onClick={(currentValue) => {
                    setValueCities(
                      city.label === valueCities ? '' : city.label
                    );
                    router.push(
                      pathname + '?' + createQueryString('city', city.label)
                    );
                    setOpenCities(false);
                  }}
                >
                  {city.label} ({city.postalCode})
                </p>
              ))}
          </Command>
        </PopoverContent>
      </Popover>
    </Fragment>
  );
}
