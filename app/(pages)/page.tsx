'use client';

import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { API_URL } from '../../@core/constants/global';
import { useFetch } from '../../@core/hooks/useFetch';
import toast from 'react-hot-toast';
import { ErrorBoundary } from "react-error-boundary";
import LastWalk from '../components/LastWalk';
import Presentation from '../components/Presentation';
import Reviews from '../components/Reviews';
import WalkMap from '../components/WalkMap';

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
      'Une application qui m\'a permis de faire de belles sorties avec mon chien !',
    image: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_7916.jpg',
  },
  {
    id : 2,
    name: 'Urielle',
    content: 'Nouvelle sur l\'application, j\'ai hâte de decouvrir de nouvelles sorties !',
    image: 'https://images.dog.ceo/breeds/poodle-medium/PXL_20210220_100624962.jpg'
  },
  {
    id : 3,
    name: 'Tomo',
    content: 'Super application, je recommande ! De belles sorties à faire !',
    image: 'https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1695.jpg'
  },
];

export default function Home() {
  const [coordinates, setCoordinates] = useState<any>();
  const [dogWalk, setDogWalk] = useState<any[]>([]);


  const url = `${API_URL}walks`;

  const { data, error } = useFetch<any[]>(url)
  
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCoordinates([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.log(error);
        setCoordinates([47.38905261221537, 0.6883621215820312]);
      },
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
    );
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setDogWalk(data);
    } else if (error) {
      console.error(error);
      toast.error('Une erreur est survenue');
    }
  }, [data, error]);

  return (
    <main>
      <ErrorBoundary FallbackComponent={Fallback}>
        <Presentation />
        <Reviews reviews={reviews} />
        <LastWalk dogWalk={dogWalk} />
        <WalkMap dogWalk={dogWalk} coordinates={coordinates} title='Retrouve toutes les destinations autours de chez toi !' />
      </ErrorBoundary>
    </main>
  );
}
