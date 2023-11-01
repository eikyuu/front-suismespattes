"use client"

import { Fragment } from "react"
import Link from "next/link"

import Text from "@/components/ui/text/Text"
import Title from "@/components/ui/text/Title"

import CardDestinations from "./card-destinations"
import PopoverCity from "./popover-city"
import { Button } from "./ui/button"

export default function Destinations() {
  return (
    <Fragment>
      <section className="container">
        <Title balise="h1" className="mb-10 mt-10 text-center">
          Toutes les destinations
        </Title>
        <Text className="text-black">
          À la recherche d&apos;une aventure inoubliable à partager avec votre
          fidèle compagnon canin lors de vos prochaines vacances ? Vous êtes au
          bon endroit.
        </Text>
        <Text className="mb-5 mt-5">
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

      <div className="md:container ">
        <div className="mb-10 flex flex-col justify-between bg-tertiary p-4 md:flex-row md:rounded-md">
          <PopoverCity />
          {/* <Text className='text-white'>+ de filtres</Text> */}
          <Link
            className="mt-5 md:mt-0 "
            href="/destinations-chien-accepte"
            title="Remettre les filtres à leur valeur par défaut"
          >
            <Button className="w-full md:w-auto">Rénitialiser</Button>
          </Link>
        </div>
      </div>

      <section className="container">
        <CardDestinations />
      </section>
    </Fragment>
  )
}
