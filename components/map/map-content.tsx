import React, { useState } from 'react';
import { Map, Marker, Overlay, Point, ZoomControl } from 'pigeon-maps';
import Link from 'next/link';
import BlurImage from '../blurImage/blur-image';
import { Destination } from '../../@core/types/DestinationForm';
import { Country } from '../../@core/enum/Country';

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

  const [state, setRawState] = useState({
    center: [50.1102, 3.1506] as Point,
    zoom: 6,
    provider: 'osm',
    metaWheelZoom: false,
    twoFingerDrag: false,
    animate: true,
    animating: false,
    zoomSnap: true,
    mouseEvents: true,
    touchEvents: true,
    minZoom: 1,
    maxZoom: 18,
    dragAnchor: [48.8565, 2.3475] as Point,
  })
  const setState = (stateChanges: Partial<typeof state>) => setRawState({ ...state, ...stateChanges })

  const {
    center,
    zoom,
    provider,
    animate,
    metaWheelZoom,
    twoFingerDrag,
    zoomSnap,
    mouseEvents,
    touchEvents,
    animating,
    minZoom,
    maxZoom,
  } = state

  const zoomIn = () => {
    setState({
      zoom: Math.min(state.zoom + 1, 18),
    })
  }

  const zoomOut = () => {
    setState({
      zoom: Math.max(state.zoom - 1, 1),
    })
  }

  const handleBoundsChange = ({ center, zoom, bounds, initial } : any) => {
    if (initial) {
      console.log('Got initial bounds: ', bounds)
    }
    setState({ center, zoom })
  }

  const handleClick = ({ event, latLng, pixel } : any) => {
    console.log('Map clicked!', latLng, pixel)
  }

  const handleMarkerClick = ({ event, payload, anchor } : any) => {
    console.log(`Marker #${payload} clicked at: `, anchor)
  }

  const handleAnimationStart = () => {
    setState({ animating: true })
  }

  const handleAnimationStop = () => {
    setState({ animating: false })
  }


  return (
    <React.Fragment>
      <Map
        limitBounds="edge"
        dprs={[1, 2]}
        height={500}
        zoom={zoom}
        center={coordinates ? [Number(coordinates[0]), Number(coordinates[1])] : undefined}
        onBoundsChanged={handleBoundsChange}
        onAnimationStart={handleAnimationStart}
        onAnimationStop={handleAnimationStop}
        animate={animate}
        metaWheelZoom={metaWheelZoom}
        twoFingerDrag={twoFingerDrag}
        zoomSnap={zoomSnap}
        mouseEvents={mouseEvents}
        touchEvents={touchEvents}
        minZoom={minZoom}
        maxZoom={maxZoom}
        defaultZoom={12}
        onClick={() => {
          setSelectedDestination(null);
        }}
      >
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
        <ZoomControl />
      </Map>
    </React.Fragment>
  );
}

export default MapContent;
