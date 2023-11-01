"use client"

import { useState } from "react"
import Image from "next/image"

interface BlurImageRoundedProps {
  image: any
  alt: string
}

export default function BlurImageRounded({
  image,
  alt,
}: BlurImageRoundedProps) {
  const [isLoading, setLoading] = useState(true)

  return (
    <a href={image.href} className="group">
      <div className="rounded-full">
        <Image
          alt={alt}
          src={image}
          width={200}
          height={300}
          className={`h-48 w-48 rounded-full border-8 border-white object-cover duration-700 ease-in-out 
             ${
               isLoading
                 ? "scale-110 blur-2xl grayscale"
                 : "scale-100 blur-0 grayscale-0"
             }
           `}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </a>
  )
}
