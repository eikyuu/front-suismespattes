import "leaflet/dist/leaflet.css"

import { Fragment } from "react"

import Banner from "@/components/banner"
import LastDestinations from "@/components/last-destinations"
import Presentation from "@/components/presentation/presentation"
import MapContainer from "../../components/map/map-container"

export default function Home() {
  return (
    <Fragment>
      <Banner />
      <Presentation />
      <LastDestinations />
      <MapContainer title="Retrouve toutes les destinations autours de chez toi !" />
    </Fragment>
  )
}
