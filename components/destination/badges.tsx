import Link from "next/link"
import { cn } from "@/@core/lib/utils"

import { Badge, badgeVariants } from "@/components/ui/badge"

interface BadgesProps {
  category: {
    name: string
  }
  isFavorite: boolean
  note: number
  obligatoryLeash: "RECOMANDED" | "YES" | "NO"
  waterPoint: boolean
  processionaryCaterpillarAlert: boolean
  cyanobacteriaAlert: boolean
  slug: string
}

export default function Badges({
  category,
  isFavorite,
  note,
  obligatoryLeash,
  waterPoint,
  processionaryCaterpillarAlert,
  cyanobacteriaAlert,
  slug,
}: BadgesProps) {
  function handleNote(note: number) {
    switch (note) {
      case 0:
        return "TRÈS NÉGATIF"
      case 1:
        return "NÉGATIF"
      case 2:
        return "NEUTRE"
      case 3:
        return "POSITIF"
      case 4:
        return "TRÈS POSITIF"
      default:
        return "NEUTRE"
    }
  }

  function handleObligatoryLeash(obligatoryLeash: "RECOMANDED" | "YES" | "NO") {
    switch (obligatoryLeash) {
      case "RECOMANDED":
        return "RECOMANDÉ"
      case "YES":
        return "LAISSE OBLIGATOIRE"
      case "NO":
        return "LAISSE NON OBLIGATOIRE"
      default:
        return "LAISSE NON OBLIGATOIRE"
    }
  }

  return (
    <div className=" flex flex-wrap gap-1 space-y-1 md:justify-start">
      <Link
        href={`/destination-chien-accepte/${slug}`}
        className={cn(badgeVariants({ variant: "default" }), "mt-1 uppercase")}
      >
        {category.name}
      </Link>
      {isFavorite && <Badge>COUP DE COEUR</Badge>}{" "}
      {waterPoint && <Badge>POINT D&#039;EAU</Badge>}
      {note && <Badge>&#9733; {handleNote(note)}</Badge>}
      {obligatoryLeash && (
        <Badge>{handleObligatoryLeash(obligatoryLeash)}</Badge>
      )}
      {processionaryCaterpillarAlert && (
        <Badge variant={"destructive"}>&#9888; CHENILLE PROCESSIONNAIRE</Badge>
      )}
      {cyanobacteriaAlert && (
        <Badge variant={"destructive"}>&#9888; CYANOBACTÉRIE</Badge>
      )}
      {/* <Badge>&#10711; &#x2A7D;1h </Badge> */}
    </div>
  )
}
