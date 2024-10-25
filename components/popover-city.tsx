'use client';

import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ChevronsUpDown } from "lucide-react"

import { Command, CommandInput } from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useCreateQueryString } from "../@core/hooks/useCreateQueryString"
import { useDebounce } from "../@core/hooks/useDebounce"
import { fetchCitiesBySearch } from "../@core/services/cityService"
import Loader from "./loader/loader"
import { Button } from "./ui/button"

export default function PopoverCity(): JSX.Element {
  const router = useRouter()
  const [openCities, setOpenCities] = useState(false)
  const [valueCities, setValueCities] = useState("")
  const [value, setValue] = useState("")

  const { pathname, searchParam, createQueryString } =
    useCreateQueryString("city")

  const debouncedValue = useDebounce<string>(value, 500)

  const handleChange = (event: string) => {
    setValue(event)
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["cities", debouncedValue],
    queryFn: async () => {
      if (debouncedValue.length >= 3) {
        return await fetchCitiesBySearch(debouncedValue)
      } else {
        return Promise.resolve([]) // Return an empty array if the search value is less than 3 characters
      }
    },
    staleTime: 500,
  })

  useEffect(() => {
    if (searchParam === null) {
      setValueCities("")
    }
  }, [searchParam])

  return (
    <Fragment>
      <Popover open={openCities} onOpenChange={setOpenCities}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCities}
            className="w-full justify-between md:w-[260px]"
          >
            {valueCities ? valueCities : "Rechercher par ville"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-h-[20rem] overflow-auto p-0 md:w-[260px]">
          <Command>
            <CommandInput
              placeholder="Rechercher une ville"
              onValueChange={(e) => handleChange(e)}
            />
            {isLoading && <Loader />}
            {data &&
              data.length > 0 &&
              data.map((city: any) => (
                <p
                  className="ml-2 cursor-pointer py-2 capitalize"
                  key={city.id}
                  onClick={(currentValue) => {
                    setValueCities(city.label === valueCities ? "" : city.label)
                    router.push(
                      "destinations-chien-accepte" + "?" + createQueryString("city", city.label)
                    )
                    setOpenCities(false)
                  }}
                >
                  {city.label} ({city.postalCode})
                </p>
              ))}
          </Command>
        </PopoverContent>
      </Popover>
    </Fragment>
  )
}
