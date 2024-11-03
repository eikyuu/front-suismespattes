"use client"

import { Fragment, use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import toast from "react-hot-toast"

import { useCreateQueryString } from "../core/hooks/useCreateQueryString"
import {
  fetchDestination,
  getDestinationsByQueries,
} from "../core/services/destinationService"
import CardDestination from "./card-destination"
import LoaderDestinations from "./loader/loader-destinations"
import { Button } from "./ui/button"

export default function CardDestinations() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { pathname, searchParam, createQueryString } =
    useCreateQueryString("page")

  const { searchParam: cityParam } = useCreateQueryString("city")

  const { searchParam: categoryParam } = useCreateQueryString("category")

  const [page, setPage] = useState(1)
  const totalItems = 12

  const { status, data, error, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["getDestinations", page, cityParam, categoryParam],
    queryFn: () => {
      if (cityParam && categoryParam) {
        return getDestinationsByQueries(
          page,
          totalItems,
          cityParam,
          categoryParam
        )
      }
      if (categoryParam) {
        return getDestinationsByQueries(page, totalItems, "", categoryParam)
      }

      if (cityParam) {
        return getDestinationsByQueries(page, totalItems, cityParam)
      }

      return fetchDestination(page, totalItems)
    },
    placeholderData: keepPreviousData,
    staleTime: 5000,
  })

  useEffect(() => {
    if (searchParam) {
      setPage(parseInt(searchParam))
    }
  }, [searchParam])

  // Prefetch the next page!
  useEffect(() => {
    if (
      !isPlaceholderData &&
      data?.pagination.total > data?.destinations.length
    ) {
      queryClient.prefetchQuery({
        queryKey: ["getDestinations", page + 1, cityParam],
        queryFn: () => {
          if (cityParam) {
            return getDestinationsByQueries(page + 1, totalItems, cityParam)
          } else {
            return fetchDestination(page + 1, totalItems)
          }
        },
      })
    }
  }, [data, isPlaceholderData, page, queryClient, cityParam])

  function handlePageChange(newPage: number) {
    const totalPages = data?.pagination.totalPages
    const validatedPage = Math.max(1, Math.min(newPage, totalPages))

    if (validatedPage === page) {
      return
    }

    setPage(validatedPage)
    router.push(
      pathname + "?" + createQueryString("page", validatedPage.toString())
    )
  }

  if (error) return toast.error("Une erreur est survenue")

  return (
    <Fragment>
      <div className="grid grid-cols-2 place-items-center items-center gap-4 sm:grid-cols-2 md:grid-cols-2 md:gap-16 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && <LoaderDestinations />}
        {data?.destinations.map((destination: any) => (
          <CardDestination key={destination.id} destination={destination} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button
          className="mr-2"
          disabled={page === 1 || isLoading}
          onClick={() => handlePageChange(page - 1)}
        >
          Précédent
        </Button>
        <Button
          disabled={
            page === data?.pagination.totalPages ||
            isLoading ||
            data.destinations.length === 0
          }
          onClick={() => handlePageChange(page + 1)}
        >
          Suivant
        </Button>
      </div>
    </Fragment>
  )
}
