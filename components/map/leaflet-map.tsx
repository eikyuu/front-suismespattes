import { MapOptions } from "leaflet"
import { MapContainer, TileLayer } from "react-leaflet"

import "leaflet/dist/leaflet.css"

import { Fragment } from "react"

function LeafletMap({
  center,
  children,
  zoom,
  mapOptions,
}: {
  center: [number, number]
  children: React.ReactNode
  zoom: number
  mapOptions?: MapOptions
}) {
  return (
    <Fragment>
      <MapContainer maxZoom={18} center={center} zoom={zoom} {...mapOptions}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/cope2yright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </Fragment>
  )
}

export default LeafletMap
