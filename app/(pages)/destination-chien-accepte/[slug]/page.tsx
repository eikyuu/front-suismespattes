import { Fragment } from "react"

import DestinationContainer from "@/components/destination/destination-container"
import ScrollUp from "@/core/lib/scrollUp"


export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <Fragment>
      <ScrollUp />
      <DestinationContainer slug={params.slug} />
    </Fragment>
  )
}
