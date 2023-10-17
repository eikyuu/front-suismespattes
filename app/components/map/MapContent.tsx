import React, { useState } from 'react';
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps';
import Link from 'next/link';
import BlurImage from '../blurImage/BlurImage';
import { Destination } from '../../../@core/types/DestinationForm';
import { Country } from '../../../@core/enum/Country';

function MapContent({
  dogDestination,
  coordinates,
}: {
  dogDestination: Destination[];
  coordinates?: [string, string];
}) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(
    null
  );

  return (
    <React.Fragment>
      <Map
        height={500}
        center={coordinates ? [Number(coordinates[0]), Number(coordinates[1])] : undefined}
        defaultZoom={12}
        onClick={() => {
          setSelectedDestination(null);
        }}
      >
        <ZoomControl />
        {dogDestination.map((walk: any, index) => (
          <Marker
            key={index.toString()}
            width={50}
            anchor={[Number(walk.latitude!), Number(walk.longitude!)]}
            color={'#0c8892'}
            onClick={() => {
              setSelectedDestination(walk);
            }}
          />
        ))}

        {selectedDestination && (
          <Overlay
            anchor={[
                Number(selectedDestination.latitude) || 0,
                Number(selectedDestination.longitude) || 0,
            ]}
            offset={[120, 79]}
          >
            <Link
              href={`/destination-chien-accepte/${selectedDestination.slug}`}
              className='block bg-white rounded-md shadow-md w-96 h-40'
            >
              <div className='brightness-50'>
                <BlurImage
                  height='h-40'
                  alt={selectedDestination.name}
                  image={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${selectedDestination.images[0].name}`}
                />
              </div>

              <div className='absolute bottom-0 left-0 p-4 text-white'>
                <p className='font-bold lowercase first-letter:uppercase'>{selectedDestination.name}</p>
                <p className='text-sm'>
                  &#x2691; {selectedDestination.street} {selectedDestination.city.postalCode}
                </p>
                <p className='text-sm uppercase'>{selectedDestination.city.label} {Country[selectedDestination.country]}</p>
              </div>
            </Link>
          </Overlay>
        )}
      </Map>
    </React.Fragment>
  );
}

export default MapContent;
