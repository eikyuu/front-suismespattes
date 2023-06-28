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
  slug: string;
}

function MapWalk({ dogWalk, coordinates }: { dogWalk: DogWalk[], coordinates?: [number, number] }) {
  const [selectedWalk, setSelectedWalk] = useState<DogWalk | null>(null);

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
        defaultCenter={[47.38905261221537, 0.6883621215820312]}
        center={coordinates ? coordinates : dogWalk[0] ? [dogWalk[0].latitude, dogWalk[0].longitude] : [47.38905261221537, 0.6883621215820312]}
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
              href={`/balade/${selectedWalk.slug}`}
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
