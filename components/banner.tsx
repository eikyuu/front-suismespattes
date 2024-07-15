import Image from "next/image"
import Link from "next/link"
import banner from "@/public/images/banner.webp"

function Banner() {
  return (
    <Link href="/" role="bannière">
      <Image
        className="container h-1/2 object-cover p-0 md:h-96 lg:mt-10 lg:h-1/2 lg:rounded-lg xl:h-160"
        src={banner}
        alt="Un chien debout sur un banc en bois, regardant au loin avec un arrière plan de montagnes et de forêts."
        loading="eager"
        priority={true}
      />
    </Link>
  )
}

export default Banner
