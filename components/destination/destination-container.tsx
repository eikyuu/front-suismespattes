"use client"

import dynamic from "next/dynamic"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

import Text from "@/components/ui/text/Text"
import Title from "@/components/ui/text/Title"

import { fetchDestinationBySlug } from "../../@core/services/destinationService"
import AddBy from "../add-by"
import EditDeleteButton from "../edit-delete-button"
import LoaderDestination from "../loader/loader-destination"
import NotFound from "../not-fount"
import SimpleGallery from "../simple-gallery"
import Badges from "./badges"
import PraticalInformation from "./pratical-information"

export const MapOneContent = dynamic(() => import("../map/map-one-content"), {
  ssr: false,
})

export default function DestinationContainer({ slug }: { slug: string }) {
  const { data: session } = useSession()

  const { error, data, isLoading } = useQuery({
    queryKey: ["destinationBySlug", slug],
    queryFn: async () => await fetchDestinationBySlug(slug),
  })

  if (isLoading) return <LoaderDestination />
  if (error) toast.error("Destination introuvable")

  if (!data) return <NotFound />

  const userRoles = session?.user?.roles
  const userEmail = session?.user?.email

  console.log(session)

  function displayEditDeleteButton() {
    if (userRoles?.includes("ROLE_ADMIN") || userEmail === data?.user?.email) {
      return <EditDeleteButton slug={data?.slug} />
    }
  }

  return (
    <div className="container">
      {displayEditDeleteButton()}

      <Title balise="h1" className="my-5">
        {data?.name}
      </Title>

      <Badges
        category={data?.category}
        isFavorite={data?.isFavorite}
        note={data?.note}
        obligatoryLeash={data?.obligatoryLeash}
        waterPoint={data?.waterPoint}
        processionaryCaterpillarAlert={data?.processionaryCaterpillarAlert}
        cyanobacteriaAlert={data?.cyanobacteriaAlert}
        slug={data?.slug}
      />

      <AddBy
        pseudo={data?.user.pseudo}
        userId={session?.user?.id!}
        updatedAt={data?.updatedAt}
        className="mt-5"
      />

      <section>
        <div className="my-5 flex flex-col md:flex-row md:space-x-20">
          <Text className="mb-5 w-full whitespace-pre-wrap md:mb-0 md:w-1/2">
            {data?.description}
          </Text>
          <div className="w-full md:w-1/2">
            <div className="h-auto">
              <SimpleGallery images={data?.images} />
              <PraticalInformation
                street={data?.street}
                city={{
                  label: data?.city.label,
                  postalCode: data?.city.postalCode,
                }}
                latitude={data?.latitude}
                longitude={data?.longitude}
              />
              <MapOneContent destination={data} />
            </div>
          </div>
        </div>

        <Text type="bold">
          La responsabilité du site ne peut être encourue pour aucun dommage ou
          danger, chacun est responsable de son propre bien-être et de ses
          animaux. *
        </Text>

        <Text type="bold">
          Merci de respecter les lieux et de ne pas laisser de déchets derrière
          vous. **
        </Text>
      </section>
    </div>
  )
}
