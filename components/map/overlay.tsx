import Link from "next/link"

import BlurImage from "../blurImage/blur-image"

function Overlay({ destination }: { destination: any }) {
  return (
    <Link
      href={`/destination-chien-accepte/${destination.slug}`}
      className="block h-40 w-96 rounded-md bg-white shadow-md"
    >
      <div className="brightness-50">
        <BlurImage
          height="h-40"
          alt={destination.name}
          image={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${destination.images[0].name}`}
        />
      </div>

      <div className="absolute bottom-8 left-8 text-white">
        <p className="font-bold lowercase first-letter:uppercase">
          {destination.name}
        </p>
        <p className="text-sm">
          &#x2691; {destination.street} {destination.city.postalCode}
        </p>
        <p className="text-sm uppercase">{destination.city.label}</p>
      </div>
    </Link>
  )
}

export default Overlay
