"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCreateQueryString } from "@/@core/hooks/useCreateQueryString"
import banner from "@/public/images/banner.webp"
import Title from "./ui/text/Title"
import SearchBar from "./search-bar"

function Banner() {
  const router = useRouter()

  const { pathname, searchParam, createQueryString } =
    useCreateQueryString("city")

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
          <SearchBar />
        </div>
      </div>
    </>
  )
}

export default Banner
