"use client"

import { keepPreviousData } from "@tanstack/query-core"
import { useQuery } from "@tanstack/react-query"

import { fetchDestinations } from "../../../../../@core/services/destinationService"
import Title from "../../../../../components/ui/text/Title"
import { columns, Destination } from "./columns"
import { DataTable } from "./data-table"

export default function DemoPage() {
  // const data = await getData()

  const { status, data, error, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["getDestinations"],
    queryFn: () => {
      return fetchDestinations()
    },
    placeholderData: keepPreviousData,
    staleTime: 5000,
  })

  return (
    <div className="container mx-auto py-10">
      <Title balise="h1">Mes destinations</Title>
      {data && <DataTable columns={columns} data={data.destinations} />}
      {isLoading && <div>Loading...</div>}
    </div>
  )
}
