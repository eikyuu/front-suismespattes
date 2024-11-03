import { Fragment, Suspense } from "react"
import dynamic from "next/dynamic"
import { divIcon, point } from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"

import { Destination } from "../../core/types/DestinationForm"
import Overlay from "./overlay"

export const LeafletMap = dynamic(() => import("./leaflet-map"), { ssr: false })

export const Marker = dynamic(
  async () => (await import("react-leaflet")).Marker,
  {
    ssr: false,
  }
)

export const Popup = dynamic(
  async () => (await import("react-leaflet")).Popup,
  {
    ssr: false,
  }
)

const ico = `<svg width="40" height="40" viewBox="0 0 61 71" fill="none" xmlns="http://www.w3.org/2000/svg"><g style="pointer-events: auto;"><path d="M52 31.5C52 36.8395 49.18 42.314 45.0107 47.6094C40.8672 52.872 35.619 57.678 31.1763 61.6922C30.7916 62.0398 30.2084 62.0398 29.8237 61.6922C25.381 57.678 20.1328 52.872 15.9893 47.6094C11.82 42.314 9 36.8395 9 31.5C9 18.5709 18.6801 9 30.5 9C42.3199 9 52 18.5709 52 31.5Z" fill="#0c8892" stroke="white" stroke-width="4"></path><circle cx="30.5" cy="30.5" r="8.5" fill="white" opacity="0.6"></circle></g></svg>`

// custom cluster icon
const createClusterCustomIcon = function (cluster: any) {
  return divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(40, 40, true),
  })
}

export default function MapOneContent({
  destination,
}: {
  destination: Destination
}) {
  return (
    <Fragment>
      <div className="z-0 h-96 w-full">
        <LeafletMap
          center={[Number(destination.latitude), Number(destination.longitude)]}
          zoom={13}
        >
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
            showCoverageOnHover={false}
          >
            <Marker
              key={destination.name}
              position={[
                Number(destination.latitude),
                Number(destination.longitude),
              ]}
              icon={divIcon({
                html: ico,
                iconSize: [40, 40],
              })}
            >
              <Popup>
                <Overlay destination={destination} />
              </Popup>
            </Marker>
          </MarkerClusterGroup>
        </LeafletMap>
      </div>
    </Fragment>
  )
}
