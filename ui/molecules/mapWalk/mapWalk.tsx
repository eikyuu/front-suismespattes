import React, { use, useEffect, useState } from 'react';
import { GeoJson, Map, Marker, Overlay, ZoomControl } from 'pigeon-maps';

interface DogWalk {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
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
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [2.0, 48.5] },
        properties: { prop0: "value0" },
      },
    ],
  };

  return (
    <>
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
              data={createGeoJson(
                Number(walk.longitude),
                Number(walk.latitude)
              )}
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
              <div className='relative top-9 left-4 bg-white rounded-lg border-2 border-black p-1 shadow-md	'>
                <ul>
                  <li>
                    <a href='#'>{selectedWalk.name}</a>
                  </li>
                  <li>
                    <a href='#'>Option 2</a>
                  </li>
                  <li>
                    <a href='#'>Option 3</a>
                  </li>
                </ul>
              </div>
            </Overlay>
          )}
        </Map>
      
    </>
  );
}

export default MapWalk;
