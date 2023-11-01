import "leaflet/dist/leaflet.css"

import Banner from "@/components/banner"
import LastDestinations from "@/components/last-destinations"
import Presentation from "@/components/presentation/presentation"
import Reviews from "@/components/review/reviews"

import MapContainer from "../../components/map/map-container"

const reviews = [
  {
    id: 1,
    name: "Amauna",
    content:
      "Une site qui m'a permis de faire de belles sorties avec mon chien !",
    image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_7916.jpg",
  },
  {
    id: 2,
    name: "Urielle",
    content: "Nouvelle par ici, j'ai hâte de decouvrir de nouvelles sorties !",
    image:
      "https://images.dog.ceo/breeds/poodle-medium/PXL_20210220_100624962.jpg",
  },
  {
    id: 3,
    name: "Tomo",
    content: "Super, je recommande ! De belles sorties à faire !",
    image: "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1695.jpg",
  },
]

export default function Home() {
  return (
    <>
      <Banner />
      <Presentation />
      <Reviews reviews={reviews} />
      <LastDestinations />
      <MapContainer title="Retrouve toutes les destinations autours de chez toi !" />
    </>
  )
}
