'use client';

import { useState } from 'react';
import Banner from '../../ui/atoms/banner/banner';
import ContentNavigation from '../../ui/molecules/contentNavigation/contentNavigation';
import Presentation from '../../ui/organisms/presentation/presentation';
import Reviews from '../../ui/molecules/reviews/reviews';
import { useFetchData } from '../../@core/hooks/useFetchData';
import LastWalk from '../../ui/organisms/lastWalk/lastWalk';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MediumTitle from '../../ui/atoms/mediumTitle/mediumTitle';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [dogWalk, setDogWalk] = useState([]);

  useFetchData(
    'https://my-json-server.typicode.com/eikyuu/db/review',
    setReviews
  );
  useFetchData(
    'https://my-json-server.typicode.com/eikyuu/db/dogWalk',
    setDogWalk
  );

  return (
    <main className='font-sans'>
      <ContentNavigation />
      <Banner />
      <Presentation />
      <Reviews reviews={reviews} />
      <LastWalk dogWalk={dogWalk} />
      <section className='bg-primary h-full mx-auto pt-10 pb-10 flex flex-col md:justify-evenly'>
        <MediumTitle
          title='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.'
          color='text-white'
        />
        <div className='container mx-auto pt-10'>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </main>
  );
}
