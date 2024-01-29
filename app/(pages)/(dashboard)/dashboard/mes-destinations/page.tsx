"use client"

import { keepPreviousData } from "@tanstack/query-core"
import { useQuery } from "@tanstack/react-query"

import { fetchDestinations, fetchDestinationsByUser } from "../../../../../@core/services/destinationService"
import Title from "../../../../../components/ui/text/Title"
import { columns, Destination } from "./columns"
import { DataTable } from "./data-table"
import { getCurrentUser } from "@/@core/lib/session"

export default function DemoPage() {


//TODO : get current user id from session and fetch destinations by user id
  const id  = 'af32d558-5558-4f72-88eb-b52d375bf089'
  
  const { status, data, error, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["getUserDestinations", id],
    queryFn: async () => {
      return await fetchDestinationsByUser(id)
    },
    placeholderData: keepPreviousData,
    staleTime: 5000,
  })

  return (
    <div className="container mx-auto py-10">
      <Title balise="h1">Mes destinations</Title>
      {data && <DataTable columns={columns} data={data} />}
      {isLoading && <div>Loading...</div>}
    </div>
  )
}
