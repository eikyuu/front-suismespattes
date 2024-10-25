"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCreateQueryString } from "@/@core/hooks/useCreateQueryString"
import banner from "@/public/images/banner.webp"
import PopoverCity from "./popover-city"
import { Button } from "./ui/button"
import Text from "./ui/text/Text"
import Title from "./ui/text/Title"

function Banner() {
  const router = useRouter()

  const { pathname, searchParam, createQueryString } =
    useCreateQueryString("city")

  const [dataFromChild, setCityFromChild] = useState("")

  // Fonction qui sera appelée par l'enfant
  const handleCityFormChild = (data: string) => {
    setCityFromChild(data)
  }

  useEffect(() => {
    console.log(dataFromChild)
  }, [dataFromChild])

  const handleDestination = () => {
    console.log("Destination : ", dataFromChild)

    router.push(
      "destinations-chien-accepte" +
        "?" +
        createQueryString("city", dataFromChild)
    )
  }

  return (
    <>
      <div className="container relative flex content-center items-center justify-center">
        <Link href="/" role="bannière">
          <Image
            className="mt-10 h-160 object-cover p-0 md:h-96 lg:h-1/2 lg:rounded-lg"
            src={banner}
            alt="Un chien debout sur un banc en bois, regardant au loin avec un arrière plan de montagnes et de forêts."
            loading="eager"
            priority={true}
          />
        </Link>
        <div className="container absolute flex flex-col items-center p-10">
          <Title
            className="mb-5 text-center text-white shadow-md md:text-5xl"
            balise="h2"
          >
            TROUVEZ VOTRE PROCHAINE DESTINATION
          </Title>

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
      </div>
    </>
  )
}

export default Banner
