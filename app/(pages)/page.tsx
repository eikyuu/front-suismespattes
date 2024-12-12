import "leaflet/dist/leaflet.css"

import { Fragment } from "react"

import Banner from "@/components/banner"
import LastDestinations from "@/components/last-destinations"
import Presentation from "@/components/presentation/presentation"
import MapContainer from "../../components/map/map-container"
import JoinUs from "@/components/join-us"

export default function Home() {
  return (
    <Fragment>
      <Banner />
      <Presentation />
      <JoinUs/>
      <LastDestinations />
      <MapContainer title="Retrouve toutes les destinations autours de chez toi !" />
    </Fragment>
  )
}
