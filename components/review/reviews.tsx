import React from "react"

import Title from "@/components/ui/text/Title"

import LoaderReviews from "../loader/loader-reviews"
import Review from "./review"

function Reviews({ reviews }: any): JSX.Element {
  return (
    <section className="flex h-full flex-col justify-center bg-primary pb-10 pt-10 xl:h-[600px]">
      <Title className="mb-10 text-center text-white" balise="h2">
        L&apos;avis des canipotes
      </Title>

      {reviews.length === 0 && <LoaderReviews />}

      <div className="container mx-auto flex flex-col items-center justify-between lg:flex-row">
        {reviews.slice(0, 3).map((review: any) => (
          <div key={review.id} className="mb-10 last:mb-0 md:mb-0">
            <Review
              name={review.name}
              content={review.content}
              image={review.image}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Reviews
