import { MapOptions } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

function LeafletMap({
  center,
  children,
  zoom,
  mapOptions,
}: {
  center: [number, number];
  children: React.ReactNode;
  zoom: number;
  mapOptions?: MapOptions;
}) {
  return (
    <>
      <MapContainer
        maxZoom={18}
        center={center}
        zoom={zoom}
        {...mapOptions}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/cope2yright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {children}
      </MapContainer>
    </>
  );
}

export default LeafletMap;