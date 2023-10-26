import React, { Suspense, useState } from 'react';
import { Destination } from '../../@core/types/DestinationForm';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import L from 'leaflet';
// import MarkerClusterGroup from 'react-leaflet-cluster';
import dynamic from 'next/dynamic'
import L, { Marker, divIcon, icon } from 'leaflet';

export const LazyMap = dynamic(() => import('./leaflet-map'), { ssr: false })

export const LazyMarker = dynamic(
  async () => (await import('react-leaflet')).Marker,
  {
    ssr: false,
  }
)

export const LazyPopup = dynamic(
  async () => (await import('react-leaflet')).Popup,
  {
    ssr: false,
  }
)

// export const LazyMarkerCluster = dynamic(
//   async () => (await import('./leaflet-map')).MarkerCluster,
//   {
//     ssr: false,
//   }
// )

const ico = `<svg width="40" height="40" viewBox="0 0 61 71" fill="none" xmlns="http://www.w3.org/2000/svg"><g style="pointer-events: auto;"><path d="M52 31.5C52 36.8395 49.18 42.314 45.0107 47.6094C40.8672 52.872 35.619 57.678 31.1763 61.6922C30.7916 62.0398 30.2084 62.0398 29.8237 61.6922C25.381 57.678 20.1328 52.872 15.9893 47.6094C11.82 42.314 9 36.8395 9 31.5C9 18.5709 18.6801 9 30.5 9C42.3199 9 52 18.5709 52 31.5Z" fill="#0c8892" stroke="white" stroke-width="4"></path><circle cx="30.5" cy="30.5" r="8.5" fill="white" opacity="0.6"></circle></g></svg>`;

Marker.prototype.options.icon = icon({
  iconUrl: './placeholder.png',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
})

// // custom cluster icon
// const createClusterCustomIcon = function (cluster: any) {
//   return new DivIcon({
//     html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
//     className: "custom-marker-cluster",
//     iconSize: point(33, 33, true)
//   });
// };

// markers
const markers = [
  {
    geocode: [48.86, 2.3522],
    popUp: 'Hello, I am pop up 1',
  },
  {
    geocode: [48.85, 2.3522],
    popUp: 'Hello, I am pop up 2',
  },
  {
    geocode: [48.855, 2.34],
    popUp: 'Hello, I am pop up 3',
  },
];

function MapContent({
  dogDestination,
  coordinates,
}: {
  dogDestination: Destination[];
  coordinates?: [string, string];
}) {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyMap center={[48.8566, 2.3522]} zoom={13}>
      {markers.map((marker) => (
            <LazyMarker
              key={marker.geocode.toString()}
              position={{ lat: marker.geocode[0], lng: marker.geocode[1] }}
              icon={ divIcon({
                html: ico,
                iconSize: [40, 40], 
              })}
              // icon={{
              //   html: ico,
              // }}
            >
              <LazyPopup>{marker.popUp}</LazyPopup>
            </LazyMarker>
          ))}
      </LazyMap>
    </Suspense>
  );
}

export default MapContent;
