"use client"

import Link from "next/link"

import Title from "@/components/ui/text/Title"
import BlurImage from "@/components/blurImage/blur-image"

import constuction from "../../../public/images/en-construction.webp"

export default function Page() {
  return (
    <section className="container mx-auto flex w-11/12 flex-col items-center justify-center md:w-1/2">
      <Title className="my-10 text-center" balise="h1">
        🚧 Page en cours de construction 🚧
      </Title>
      <BlurImage
        image={constuction}
        height="h-96"
        alt="Deux personnage en jouets qui imite un chantier"
      />
      <Link className="mt-10" href="/">
        Retour à l&apos;accueil
      </Link>
    </section>
  )
}
