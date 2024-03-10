import Link from "next/link"

import { Button } from "@/components/ui/button"
import Text from "@/components/ui/text/Text"

import { Country } from "../@core/enum/Country"
import BlurImage from "./blurImage/blur-image"

//import { HeartIcon } from '@heroicons/react/24/outline';

function CardDestination({
  destination,
  height = "h-40 md:h-72",
}: {
  destination: {
    name: string
    city: {
      label: string
      departmentCode: string
    }
    country: keyof typeof Country
    postalCode: string
    slug: string
    images: [
      {
        name: string
      }
    ]
    category: {
      name: string
    }
    isFavorite: boolean
    user: {
      isAdmin: boolean
    }
  }
  height?: string
}): JSX.Element {
  const elipsis = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text
  }

  return (
    <Link
      href={`destination-chien-accepte/${destination.slug}`}
      className="xs:last:mb-0 flex h-full w-full flex-col justify-between focus:outline-none focus:ring-4 focus:ring-tertiary md:w-72 md:pb-4"
    >
      <picture className="mb-2">
        <div className="absolute z-10 flex flex-row items-start justify-between p-2">
          <div className="flex flex-col justify-between">
            {!destination.user.isAdmin && (
              <Button className="hidden h-auto bg-tertiary bg-opacity-80 p-1 hover:bg-primary md:block md:h-10 md:p-2 md:text-sm">
                PARTAGÉ PAR UN CANIPOTE
              </Button>
            )}

            {destination.isFavorite && (
              <Button className="mt-2 hidden h-auto bg-tertiary bg-opacity-80 p-1 hover:bg-primary md:block md:h-10 md:p-2 md:text-sm">
                COUP DE COEUR
              </Button>
            )}
          </div>
          {/* <Button className='bg-opacity-80 h-10'>
            <HeartIcon className='w-5 h-5' />
          </Button> */}
        </div>

        <BlurImage
          height={height}
          alt={`Image de la destination ${destination.name} a ${destination.city}`}
          image={`${process.env.NEXT_PUBLIC_API_URL}destinations/images/${destination.images[0]?.name}`}
        />
      </picture>
      <div className="mb-1">
        <Text
          type="bold"
          className="text-sm lowercase text-black first-letter:uppercase md:text-base"
        >
          {elipsis(destination.name, 20)}
        </Text>
        <Text type="gray" className="text-sm uppercase md:text-base">
          {`${destination.city.label}, (${destination.city.departmentCode}), ${
            Country[destination.country]
          }`}
        </Text>
        <Text type="gray" className="text-sm uppercase md:text-base">
          {destination.category.name}
        </Text>
      </div>
      <Button
        variant="default"
        className="mt-2 h-auto bg-tertiary bg-opacity-80 p-1 hover:bg-primary md:h-10 md:p-2 md:text-sm"
      >
        DÉCOUVRIR
      </Button>
    </Link>
  )
}

export default CardDestination
