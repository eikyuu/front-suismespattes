'use client';

import { useEffect, useState } from 'react';
import Presentation from '../../ui/organisms/presentation/presentation';
import Reviews from '../../ui/molecules/reviews/reviews';
import LastWalk from '../../ui/organisms/lastWalk/lastWalk';
import 'leaflet/dist/leaflet.css';
import WalkMap from '../../ui/organisms/walkMap/walkMap';
import { API_URL } from '../../@core/constants/global';
import { useFetch } from '../../@core/hooks/useFetch';

const reviews = [
  {
    id : 1,
    name: 'Julie',
    content:
      'Une application qui m\'a permis de faire de belles sorties avec mon chien !',
    image: 'https://randomuser.me/api/portraits/women/70.jpg',
  },
  {
    id : 2,
    name: 'Arielle',
    content: 'Nouvelle sur l\'application, j\'ai hâte de decouvrir de nouvelles balades !',
    image: 'https://randomuser.me/api/portraits/women/82.jpg'
  },
  {
    id : 3,
    name: 'John',
    content: 'Super application, je recommande ! De belles balades à faire !',
    image: 'https://randomuser.me/api/portraits/men/72.jpg'
  },
];

export default function Home() {
  const [coordinates, setCoordinates] = useState<any>();
  const [dogWalk, setDogWalk] = useState<any[]>([]);


  const url = `${API_URL}/walks`;

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
    }
  }, [data]);

  return (
    <main className='font-sans'>
      <Presentation />
      <Reviews reviews={reviews} />
      <LastWalk dogWalk={dogWalk} />
      <WalkMap dogWalk={dogWalk} coordinates={coordinates} title='Retrouve toutes les balades autours de chez toi !' />
    </main>
  );
}
