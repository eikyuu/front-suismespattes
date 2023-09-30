'use client';

import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { API_URL } from '../../@core/constants/global';
import { useFetch } from '../../@core/hooks/useFetch';
import toast from 'react-hot-toast';
import { ErrorBoundary } from "react-error-boundary";
import LastDestinations from '../components/LastDestinations';
import Presentation from '../components/Presentation';
import MapContainer from '../components/map/MapContainer';
import Reviews from '../components/review/Reviews';
import Banner from '../components/Banner';

function Fallback({ error, resetErrorBoundary } : any) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  resetErrorBoundary();
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

const reviews = [
  {
    id : 1,
    name: 'Amauna',
    content:
      'Une site qui m\'a permis de faire de belles sorties avec mon chien !',
    image: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_7916.jpg',
  },
  {
    id : 2,
    name: 'Urielle',
    content: 'Nouvelle par ici, j\'ai hâte de decouvrir de nouvelles sorties !',
    image: 'https://images.dog.ceo/breeds/poodle-medium/PXL_20210220_100624962.jpg'
  },
  {
    id : 3,
    name: 'Tomo',
    content: 'Super, je recommande ! De belles sorties à faire !',
    image: 'https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1695.jpg'
  },
];

export default function Home() {
  const [coordinates, setCoordinates] = useState<any>();
  const [dogDestination, setDogDestination] = useState<any[]>([]);
  const [dogDestinationAll, setDogDestinationAll] = useState<any[]>([]);


  const url = `${API_URL}destination?page=1&limit=4`;
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


  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDogDestination((prevItems) => [...prevItems, ...data.data]);
    } catch (error) {
     toast.error('Une erreur est survenue'); 
    } finally {
      console.log('done');
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataAll();
    // eslint-disable-next-line
  }, []);


  const fetchDataAll = async () => {
    try {
      const response = await fetch(urlall);
      const data = await response.json();
      setDogDestinationAll((prevItems) => [...prevItems, ...data.data]);
    } catch (error) {
     toast.error('Une erreur est survenue'); 
    } finally {
      console.log('done');
    }
  };


  return (
    <main>
      <ErrorBoundary FallbackComponent={Fallback}>
        <Banner />
        <Presentation />
        <Reviews reviews={reviews} />
        <LastDestinations dogDestination={dogDestination} />
        <MapContainer dogDestination={dogDestinationAll} coordinates={coordinates} title='Retrouve toutes les destinations autours de chez toi !' />
      </ErrorBoundary>
    </main>
  );
}
