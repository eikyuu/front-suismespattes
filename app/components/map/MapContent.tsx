import React, { useState } from 'react';
import { GeoJson, Map, Overlay, ZoomControl } from 'pigeon-maps';
import Link from 'next/link';

interface DogDestination {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  city: string;
  note: number;
  slug: string;
}

function MapContent({ dogDestination, coordinates }: { dogDestination: DogDestination[], coordinates?: [number, number] }) {
  const [selectedDestination, setSelectedDestination] = useState<DogDestination | null>(null);

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

  return (
    <React.Fragment>
      <Map
        height={500}
        center={coordinates}
        defaultZoom={12}
        onClick={() => {
          setSelectedDestination(null);
        }}
      >
        <ZoomControl />
        {dogDestination.map((walk: DogDestination, index) => (
          <GeoJson
            key={index.toString()}
            data={createGeoJson(Number(walk.longitude), Number(walk.latitude))}
            styleCallback={styleCallback}
            onClick={() => {
              setSelectedDestination(walk);
            }}
          />
        ))}

        {selectedDestination && (
          <Overlay
            anchor={[selectedDestination.latitude, selectedDestination.longitude]}
            offset={[120, 79]}
          >
            <Link
              href={`/destination/${selectedDestination.slug}`}
               
              className='block relative top-9 left-4 bg-white rounded-lg border-1 border-black p-1 shadow-md	'
            >
              <p>{selectedDestination.name}</p>
              <p>{selectedDestination.city}</p>
              <p>
                &#11088;
                <span className='ml-2 font-semibold'>{selectedDestination.note}</span>
                /5{' '}
              </p>
            </Link>
          </Overlay>
        )}
      </Map>
    </React.Fragment>
  );
}

export default MapContent;
