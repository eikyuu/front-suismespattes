"use client"

import { useState } from "react"
import Image from "next/image"

interface BlurImageProps {
  image: any
  alt: string
  height: string
}

export default function BlurImage({ image, alt, height }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-md bg-gray-200">
      <Image
        alt={alt}
        src={image}
        width={1140}
        height={760}
        quality={100}
        className={`${height} transition-duration-700 w-full transform object-cover object-center ease-in-out group-hover:opacity-75 ${
          isLoading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        }`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}
