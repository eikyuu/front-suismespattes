import React, { Suspense, useState } from 'react';
import { Destination } from '../../@core/types/DestinationForm';
import dynamic from 'next/dynamic';
import { Marker, divIcon, icon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Link from 'next/link';
import BlurImage from '../blurImage/blur-image';

export const LazyMap = dynamic(() => import('./leaflet-map'), { ssr: false });

export const LazyMarker = dynamic(
  async () => (await import('react-leaflet')).Marker,
  {
    ssr: false,
  }
);

export const LazyPopup = dynamic(
  async () => (await import('react-leaflet')).Popup,
  {
    ssr: false,
  }
);

const ico = `<svg width="40" height="40" viewBox="0 0 61 71" fill="none" xmlns="http://www.w3.org/2000/svg"><g style="pointer-events: auto;"><path d="M52 31.5C52 36.8395 49.18 42.314 45.0107 47.6094C40.8672 52.872 35.619 57.678 31.1763 61.6922C30.7916 62.0398 30.2084 62.0398 29.8237 61.6922C25.381 57.678 20.1328 52.872 15.9893 47.6094C11.82 42.314 9 36.8395 9 31.5C9 18.5709 18.6801 9 30.5 9C42.3199 9 52 18.5709 52 31.5Z" fill="#0c8892" stroke="white" stroke-width="4"></path><circle cx="30.5" cy="30.5" r="8.5" fill="white" opacity="0.6"></circle></g></svg>`;

Marker.prototype.options.icon = icon({
  iconUrl: './placeholder.png',
  iconSize: [40, 40],
  iconAnchor: [12, 24],
});

// custom cluster icon
const createClusterCustomIcon = function (cluster: any) {
  return divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(40, 40, true),
  });
};

function MapContent({
  destinations,
}: {
  destinations: Destination[];
}) {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyMap
        center={
          destinations
            ? [Number(destinations[0].latitude), Number(destinations[0].longitude)]
            : [47.39235495962892, 0.6897129358274583]
        }
        zoom={13}
      >
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {destinations && destinations.map((marker) => (
            <LazyMarker
              key={marker.name}
              position={[Number(marker.latitude), Number(marker.longitude)]}
              icon={divIcon({
                html: ico,
                iconSize: [40, 40],
              })}
            >
              <LazyPopup>
                <Link
                  href={`/destination-chien-accepte/${marker.slug}`}
                  className='block bg-white rounded-md shadow-md w-96 h-40'
                >
                  <div className='brightness-50'>
                    <BlurImage
                      height='h-40'
                      alt={marker.name}
                      image={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${marker.images[0].name}`}
                    />
                  </div>

                  <div className='absolute bottom-8 left-8 text-white'>
                    <p className='font-bold lowercase first-letter:uppercase'>
                      {marker.name}
                    </p>
                    <p className='text-sm'>
                      &#x2691; {marker.street} {marker.city.postalCode}
                    </p>
                    <p className='text-sm uppercase'>{marker.city.label}</p>
                  </div>
                </Link>
              </LazyPopup>
            </LazyMarker>
          ))}
        </MarkerClusterGroup>
      </LazyMap>
    </Suspense>
  );
}

export default MapContent;
