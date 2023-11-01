import React from "react"

import DestinationContainer from "@/components/destination-container"

import ScrollUp from "../../../../@core/lib/scrollUp"

export default function Page({
  params,
}: {
  params: { slug: string }
}): JSX.Element {
  return (
    <>
      <ScrollUp />
      <DestinationContainer slug={params.slug} />
    </>
  )
}
