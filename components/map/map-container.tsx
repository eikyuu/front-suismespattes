"use client"

import dynamic from "next/dynamic"
import { useQuery } from "@tanstack/react-query"

import Title from "@/components/ui/text/Title"

import { fetchDestinations } from "../../core/services/destinationService"
import { Skeleton } from "../ui/skeleton"

export const MapContent = dynamic(() => import("./map-content"), {
  ssr: false,
})

function MapContainer({
  title,
  destination,
}: {
  title: string
  destination?: any
}) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => {
      if (destination) {
        return []
      }
      return fetchDestinations()
    },
  })

  if (error) return <p>Une erreur est survenue</p>

  return (
    <section className="mx-auto flex flex-col bg-primary py-10">
      <div className="container mx-auto ">
        <Title className="mb-10 text-center text-white" balise="h2">
          {title}
        </Title>
        {isLoading && <Skeleton className="mb-4 h-[600px] w-full" />}
        <div className="h-[600px] w-full">
          <MapContent
            destinations={destination ? [destination] : data?.destinations}
          />
        </div>
      </div>
    </section>
  )
}

export default MapContainer
