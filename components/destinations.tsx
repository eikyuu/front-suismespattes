"use client"

import { Fragment, useState } from "react"
import Link from "next/link"

import Text from "@/components/ui/text/Text"
import Title from "@/components/ui/text/Title"

import CardDestinations from "./card-destinations"
import PopoverCity from "./popover-city"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useCreateQueryString } from "@/@core/hooks/useCreateQueryString"

export default function Destinations() {

  const router = useRouter()

  const { pathname, searchParam, createQueryString } =
    useCreateQueryString("city")

  const [dataFromChild, setCityFromChild] = useState("")

  // Fonction qui sera appelée par l'enfant
  const handleCityFormChild = (data: string) => {
    setCityFromChild(data)
  }

  const handleDestination = () => {
    console.log("Destination : ", dataFromChild)

    router.push(
      "destinations-chien-accepte" +
        "?" +
        createQueryString("city", dataFromChild)
    )
  }
  
  return (
    <Fragment>
      <section className="container">
        <Title balise="h1" className="my-10 text-center">
          Toutes les destinations
        </Title>
        <Text className="text-black">
          À la recherche d&apos;une aventure inoubliable à partager avec votre
          fidèle compagnon canin lors de vos prochaines vacances ? Vous êtes au
          bon endroit.
        </Text>
        <Text className="my-5">
          &#128021; &#x26FA; &#x2705; Que vous soyez amateurs de plein air,
          d&apos;exploration ou de découvertes culturelles, il existe une
          myriade d&apos;options pour vous et votre chien. Dites adieu à
          l&apos;idée de laisser votre compagnon à quatre pattes derrière vous,
          car de nombreux endroits vous accueillent à bras ouverts, prêts à vous
          offrir une expérience mémorable ensemble.
        </Text>
        <Text className="mb-10 mt-5">
          Partez à l&apos;aventure en France avec votre fidèle compagnon canin.
          Des plages de Normandie aux montagnes des Alpes, découvrez ensemble
          des trésors cachés et vivez une escapade inoubliable. 🐾🇫🇷
        </Text>
      </section>

      <Text
        className="container mb-5 text-center text-black md:text-left"
        type="bold"
      >
        Vous cherchez une destination en particulier ?
      </Text>

      <div className="container ">


      <div className="mb-10 flex  h-full w-full flex-col justify-between gap-4 rounded-md bg-tertiary p-4 md:h-auto md:w-full md:flex-row ">
            <div className="flex flex-col gap-4 md:flex-row">
              <PopoverCity sendCityToParent={handleCityFormChild} />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <Button onClick={handleDestination} className="w-full md:w-auto">
                Chercher
              </Button>
              <Link
                className="md:mt-0 "
                href="/destinations-chien-accepte"
                title="Remettre les filtres à leur valeur par défaut"
              >
                <Button className="w-full md:w-auto">Rénitialiser</Button>
              </Link>
            </div>
          </div>


      </div>

      <section className="container">
        <CardDestinations />
      </section>
    </Fragment>
  )
}
