import { useMemo } from "react"
import dynamic from "next/dynamic"
import { divIcon } from "leaflet"

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

function DraggableMarker({
  form,
  anchor,
}: {
  form: any
  anchor: any
}) {
  const eventHandlers = useMemo(
    () => ({
      dragend(e: any) {
        form.setValue("latitude", e.target.getLatLng().lat.toString())
        form.setValue("longitude", e.target.getLatLng().lng.toString())
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={anchor}
      icon={divIcon({
        html: ico,
        iconSize: [40, 40],
      })}
    ></Marker>
  )
}

export default DraggableMarker
