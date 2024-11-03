"use client"

import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import Title from "@/components/ui/text/Title"

import { fetchDestination } from "../core/services/destinationService"
import CardDestination from "./card-destination"
import LoaderDestinations from "./loader/loader-destinations"

function LastDestinations(): JSX.Element {
  const [isMobile, setIsMobile] = useState(false)

  const { isLoading, error, data } = useQuery({
    queryKey: ["destinations", 1, 4],
    queryFn: () => fetchDestination(1, 4),
  })

  const handleResize = () => {
    window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  }, [isMobile])

  if (error) toast.error("Une erreur est survenue")

  return (
    <>
      {isMobile ? (
        <section className="h-full py-10">
          <Title className="text-center" balise="h2">
            Les dernières destinations
          </Title>
          <div className="mx-auto flex w-11/12 flex-col flex-wrap justify-between py-10 md:flex-row">
            {isLoading && <LoaderDestinations />}

            <Swiper
              slidesPerView={"auto"}
              spaceBetween={16}
              className="h-full w-full"
            >
              {!isLoading &&
                data.destinations.length > 0 &&
                data.destinations.map((destination: any) => (
                  <SwiperSlide
                    key={destination.id}
                    className="!w-11/12 last:w-full"
                  >
                    <CardDestination height="h-72" destination={destination} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="text-center">
            <Link className="outline-none" href="/destinations-chien-accepte">
              <Button>Voir toutes les destinations</Button>
            </Link>
          </div>
        </section>
      ) : (
        <section className="/80 container mx-auto flex h-full w-11/12 flex-col flex-wrap justify-center bg-map bg-cover bg-center bg-no-repeat py-10 md:w-full xl:h-166">
          <Title balise="h2" className="mb-10 text-center">
            Les dernières destinations
          </Title>
          <div className="grid grid-cols-1 place-items-center items-center md:grid-cols-2 xl:grid-cols-4">
            {isLoading && <LoaderDestinations />}
            {!isLoading &&
              data.destinations.length > 0 &&
              data.destinations.map((destination: any) => (
                <CardDestination
                  key={destination.id}
                  destination={destination}
                />
              ))}
          </div>
          <div className="mt-5 text-center">
            <Link className="outline-none" href="/destinations-chien-accepte">
              <Button>Voir toutes les destinations</Button>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

export default LastDestinations
