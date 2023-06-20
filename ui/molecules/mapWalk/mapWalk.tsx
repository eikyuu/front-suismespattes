import React, { use, useEffect, useState } from 'react';
import { GeoJson, Map, Marker, Overlay, ZoomControl } from 'pigeon-maps';
import Link from 'next/link';

interface DogWalk {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  city: string;
  note: number;
}

function MapWalk({ dogWalk }: { dogWalk: DogWalk[] }) {
  const [selectedWalk, setSelectedWalk] = useState<DogWalk | null>(null);

  const [coordinates, setCoordinates] = useState<[number, number]>([
    47.35371061951363, 0.6866455078125001,
  ]);

  const createGeoJson = (longitude: number, latitude: number) => {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [longitude, latitude] },
          properties: { prop0: 'value0' },
        },
      ],
    };
  };

  const styleCallback = () => {
    return {
      fill: '#0C889299',
      strokeWidth: '1',
      stroke: 'white',
      r: '25',
    };
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCoordinates([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
    );
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const geoJsonSample = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [2.0, 48.5] },
        properties: { prop0: 'value0' },
      },
    ],
  };

  return (
    <React.Fragment>
      <Map
        height={500}
        defaultCenter={[47.38905261221537, 0.6883621215820312]}
        center={coordinates}
        defaultZoom={12}
        onClick={() => {
          setSelectedWalk(null);
        }}
      >
        <ZoomControl />

        {dogWalk.map((walk: DogWalk, index) => (
          <GeoJson
            key={index.toString()}
            data={createGeoJson(Number(walk.longitude), Number(walk.latitude))}
            styleCallback={styleCallback}
            onClick={() => {
              setSelectedWalk(walk);
            }}
          />
        ))}

        {selectedWalk && (
          <Overlay
            anchor={[selectedWalk.latitude, selectedWalk.longitude]}
            offset={[120, 79]}
          >
            <Link
              href='#'
              className='block relative top-9 left-4 bg-white rounded-lg border-1 border-black p-1 shadow-md	'
            >
              <p>{selectedWalk.name}</p>
              <p>{selectedWalk.city}</p>
              <p>
                &#11088;
                <span className='ml-2 font-semibold'>{selectedWalk.note}</span>
                /5{' '}
              </p>
            </Link>
          </Overlay>
        )}
      </Map>
    </React.Fragment>
  );
}

export default MapWalk;
