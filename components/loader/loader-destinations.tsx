import React from "react"

import { Skeleton } from "../ui/skeleton"

function LoaderDestinations() {
  return (
    <>
      <div className="mb-4 flex flex-col">
        <Skeleton className="mb-4  h-[288px] w-[288px]" />
        <Skeleton className="mb-4 h-4 w-[288px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="mb-4 flex flex-col">
        <Skeleton className="mb-4 h-[288px] w-[288px]" />
        <Skeleton className="mb-4 h-4 w-[288px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="mb-4 flex flex-col">
        <Skeleton className="mb-4 h-[288px] w-[288px]" />
        <Skeleton className="mb-4 h-4 w-[288px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="mb-4 flex flex-col">
        <Skeleton className="mb-4 h-[288px] w-[288px]" />
        <Skeleton className="mb-4 h-4 w-[288px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </>
  )
}

export default LoaderDestinations
