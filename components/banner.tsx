import Image from "next/image"
import Link from "next/link"
import banner from "@/public/images/banner.webp"
import PopoverCity from "./popover-city"
import { Button } from "./ui/button"

function Banner() {
  return (
    <>
        <Link href="/" role="bannière">
      <Image
        className="container h-1/2 object-cover p-0 md:h-96 lg:mt-10 lg:h-1/2 lg:rounded-lg xl:h-160"
        src={banner}
        alt="Un chien debout sur un banc en bois, regardant au loin avec un arrière plan de montagnes et de forêts."
        loading="eager"
        priority={true}
      />
    </Link>
    <div className="md:container relative -top-40">
        <div className="flex flex-col justify-between bg-tertiary p-4 md:flex-row md:rounded-md">
          <PopoverCity />
          {/* <Text className='text-white'>+ de filtres</Text> */}
          {/* <Link
            className="mt-5 md:mt-0 "
            href="/destinations-chien-accepte"
            title="Remettre les filtres à leur valeur par défaut"
          >
            <Button className="w-full md:w-auto">Rénitialiser</Button>
          </Link> */}
        </div>
      </div>
    </>
  )
}

export default Banner
