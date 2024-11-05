"use client"

import React, { useState } from "react"
import PopoverCity from "./popover-city"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import PopoverCategory from "./popover-category"

export default function SearchBar() {
  const router = useRouter()

  const [dataFromChild, setCityFromChild] = useState("")
  const [dataFromChildCategory, setCategoryFromChild] = useState("")

  // Fonction qui sera appelée par l'enfant
  const handleCityFormChild = (data: string) => {
    setCityFromChild(data)
  }

  const handleCategoryFormChild = (data: string) => {
    setCategoryFromChild(data)
  }

  const handleDestination = () => {

    router.push("destinations-chien-accepte");

    // Après un léger délai, ajouter les nouveaux paramètres
    setTimeout(() => {
      if (dataFromChild && dataFromChildCategory) {
        router.push(
          "destinations-chien-accepte" +
          "?" +
          "city=" + dataFromChild +
          "&" +
          "category=" + dataFromChildCategory
        );
      } else if (dataFromChild) {
        router.push(
          "destinations-chien-accepte" +
          "?" +
          "city=" + dataFromChild
        );
      } else if (dataFromChildCategory) {
        router.push(
          "destinations-chien-accepte" +
          "?" +
          "category=" + dataFromChildCategory);
      }
    }, 0);
  };

  return (
    <div className="mb-10 flex  h-full w-full flex-col justify-between gap-4 rounded-md bg-tertiary p-4 md:h-auto md:w-full md:flex-row ">
      <div className="flex flex-col gap-4 md:flex-row">
        <PopoverCity sendCityToParent={handleCityFormChild} />

        <PopoverCategory
          sendCategoryToParent={handleCategoryFormChild}
        />
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Button onClick={handleDestination} className="w-full md:w-auto">
          Chercher
        </Button>
        <Link
          className="md:mt-0 "
          href="/destinations-chien-accepte"
          title="Remettre les filtres à leur valeur par défaut"
        >
          <Button className="w-full md:w-auto">Rénitialiser</Button>
        </Link>
      </div>
    </div>
  )
}
