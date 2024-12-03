import Image from "next/image"

import "photoswipe/dist/photoswipe.css"

import { Gallery, Item } from "react-photoswipe-gallery"

function SimpleGallery({ images }: { images: any[] }) {
  return (
    <Gallery>
      <div className="grid grid-cols-2 justify-items-center gap-4 text-center md:grid-cols-4">
        {images.map((image) => (
          <Item
            key={image.id}
            original={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${image.name}`}
            thumbnail={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${image.name}`}
            width={image.width || 1600}
            height={image.height || 1000}
          >
            {({ ref, open }) => (
              <Image
                onClick={open}
                src={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${image.name}`}
                alt="kitten"
                priority={true}
                loading="eager"
                ref={ref as React.MutableRefObject<HTMLImageElement>}
                width="600"
                height="600"
                className="h-[100px] w-[150px] cursor-pointer rounded-md object-cover"
                sizes="(max-width: 600px) 100vw, 600px"
              />
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  )
}

export default SimpleGallery
