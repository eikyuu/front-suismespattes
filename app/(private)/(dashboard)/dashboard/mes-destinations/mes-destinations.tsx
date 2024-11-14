'use client'

import { fetchDestinationsByUser } from "@/core/services/destinationService";
import Title from "@/components/ui/text/Title";
import { keepPreviousData } from "@tanstack/query-core";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";

export function MesDestinations({ id }: { id: string }) {

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