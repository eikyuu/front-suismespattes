'use client';
import MapContent from './map-content';
import Title from '@/components/ui/text/Title';
import { useEffect, useState } from 'react';
import { API_URL } from '../../@core/constants/global';
import toast from 'react-hot-toast';

function MapContainer({ title, slug }: { title: string; slug?: string }) {
  const [coordinates, setCoordinates] = useState<any>();
  const [dogDestination, setDogDestination] = useState<any[]>([]);

  const url = `${API_URL}destination/${slug}`;

  const urlall = `${API_URL}destination`;

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCoordinates([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        setCoordinates([47.38905261221537, 0.6883621215820312]);
      },
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
    );
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (!slug) fetchDataAll();
    else fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchDataAll = async () => {
    try {
      const response = await fetch(urlall);
      const data = await response.json();
      setDogDestination((prevItems) => [...prevItems, ...data.destinations]);
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDogDestination([data]);

      //data.latitude to number

      const lat = Number(data.latitude);
      const lng = Number(data.longitude);

      setCoordinates([lat, lng]);
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  return (
    <section className='bg-primary h-full md:h-166 mx-auto pt-10 pb-10 flex flex-col md:justify-center'>

      <div className='container mx-auto'>
      <Title className='text-white text-center mb-10' balise='h2'>
        {title}
      </Title>
        <MapContent dogDestination={dogDestination} coordinates={coordinates} />
      </div>
    </section>
  );
}

export default MapContainer;
