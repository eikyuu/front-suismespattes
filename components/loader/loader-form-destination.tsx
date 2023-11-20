import React from "react"

import { Skeleton } from "@/components/ui/skeleton"

import GreenContainer from "../green-container"

function LoaderFormDestination() {
  return (
    <div className="space-y-8">
      <GreenContainer className="space-y-6">
        <Skeleton className="h-[30px] w-full md:w-[200px]" />
        <Skeleton className="h-[30px] w-full" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[60px] w-full" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[60px] w-full md:w-[200px]" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[40px] w-full md:w-[200px]" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[40px] w-full md:w-[200px]" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[40px] w-full md:w-[200px]" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[40px] w-full md:w-[400px]" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[40px] w-full md:w-[600px]" />
      </GreenContainer>
      <GreenContainer className="space-y-6">
        <Skeleton className="h-[30px] w-full md:w-[200px]" />
        <Skeleton className="h-[30px] w-full" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[60px] w-full" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[60px] w-full md:w-[200px]" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[40px] w-full md:w-[200px]" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[40px] w-full md:w-[200px]" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[40px] w-full md:w-[200px]" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[40px] w-full md:w-[400px]" />

        <Skeleton className="h-[15px] w-full md:w-[200px]" />
        <Skeleton className="h-[40px] w-full md:w-[600px]" />
      </GreenContainer>

      <GreenContainer className="space-y-6">
        <Skeleton className="h-[30px] w-full md:w-[200px]" />
        <Skeleton className="h-[30px] w-full" />
      </GreenContainer>
    </div>
  )
}

export default LoaderFormDestination
