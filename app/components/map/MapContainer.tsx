'use client'

import MapContent from './MapContent';
import Title from '../text/Title';
import { API_URL } from '../../../@core/constants/global';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

function MapContainer({ coordinates, title }: { coordinates: any; title: string }) {
  const url = `${API_URL}destination?page=1&limit=4`;
  const [destination, setDestination] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDestination((prevItems) => [...prevItems, ...data.data]);
    } catch (error) {
     toast.error('Une erreur est survenue'); 
    } finally {
      console.log('done');
    }
  };


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  
  return (
    <section className='bg-primary h-full md:h-166 mx-auto pt-10 pb-10 flex flex-col md:justify-center'>
      <Title
        className='text-white text-center mb-10'
        balise='h2'
      >
        {title}
      </Title>
      <div className='container mx-auto w-11/12 md:w-1/2'>
        <MapContent dogDestination={destination} coordinates={coordinates}/>
      </div>
    </section>
  );
}

export default MapContainer;
