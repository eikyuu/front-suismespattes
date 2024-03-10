import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

import Image from "next/image"
import { FreeMode, Navigation, Swiper as S, Thumbs } from "swiper"

import BlurImage from "./blurImage/blur-image"

function SwiperContainer({ data }: { data: any }): JSX.Element {
  const [thumbsSwiper, setThumbsSwiper] = useState<S | null>(null)
  return (
    <div className="mx-auto w-11/12 md:m-0 md:w-1/2">
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Navigation]}
        className="mySwiper2 w-full"
      >
        {data && data.length > 0 ? (
          data.map((data: any) => (
            <SwiperSlide key={data.id} className="w-full">
              <BlurImage
                height="h-144"
                alt={data.name}
                image={`${process.env.NEXT_PUBLIC_API_URL}destinations/images/${data.name}`}
              />
            </SwiperSlide>
          ))
        ) : (
          <Image
            className="h-144 w-full rounded-md object-cover"
            src={"/images/placeholder.webp"}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs, Navigation]}
        className="mySwiper mt-2"
      >
        {data && data.length > 0 ? (
          data.map((data: any) => (
            <SwiperSlide key={data.id}>
              <BlurImage
                height="h-40"
                alt={data.name}
                image={`${process.env.NEXT_PUBLIC_API_URL}destinations/images/${data.name}`}
              />
            </SwiperSlide>
          ))
        ) : (
          <Image
            className="h-36 rounded-md object-cover"
            src={"/images/placeholder.webp"}
            width={500}
            height={500}
            alt="Une image par défaut"
          />
        )}
      </Swiper>
    </div>
  )
}

export default SwiperContainer
