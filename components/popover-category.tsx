"use client"

import { useEffect, useState } from "react"
import { cn } from "@/core/lib/utils"
import { fetchCategories } from "@/core/services/categoryService"
import { useQuery } from "@tanstack/react-query"
import { Check, ChevronsUpDown, TrashIcon } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "./ui/button"
import { useCreateQueryString } from "@/core/hooks/useCreateQueryString"

export default function PopoverCategory({ sendCategoryToParent, valueCategory }: any) {
  const [open, setOpen] = useState(false)
  const [valueCategories, setValueCategories] = useState("")
  const { searchParam } =
    useCreateQueryString("category")

  const {
    error: errorCategories,
    data: categories,
    isLoading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCategories(),
  })

  useEffect(() => {
    if (searchParam == null) {
      setValueCategories("")
    }
  }, [searchParam])

  useEffect(() => {
    if (valueCategory !== valueCategories) {
      setValueCategories(valueCategory);
    }
  }, [valueCategory]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between capitalize md:w-[260px]",
              !valueCategories && "text-muted-foreground"
            )}
          >
            {valueCategories
              ? categories.find((category: any) => category.id === valueCategories)
                  ?.name
              : "Choissisez une categorie"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[20rem] w-full overflow-auto p-0 md:w-[260px]">
        <Command>
          <CommandInput placeholder="Rechercher une catégorie" />
          <CommandEmpty>Aucune catégorie trouvé.</CommandEmpty>
          <CommandGroup>
            {categories &&
              categories.map((category: any) => (
                <CommandItem
                  className="capitalize"
                  value={category.id}
                  key={category.id}
                  onSelect={() => {
                    sendCategoryToParent(category.id)
                    setValueCategories(category.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      category.name === valueCategories
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
