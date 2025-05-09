import { Metadata } from "next"

import Title from "@/components/ui/text/Title"

import { DestinationForm } from "../../../components/form/destination-form"

export const metadata: Metadata = {
  title: "Partage une destination testée avec mon chien - suismespattes.com",
  description: "Partage une destination testée avec mon chien",
}

export default function Page() {
  return (
    <section className="container mx-auto mt-10">
      <Title className="text-center" balise="h1">
        AJOUTER UN LIEU TESTÉ AVEC MON CHIEN
      </Title>
      <p className="mt-10">
        <b>
          Les moments partagés avec nos fidèles compagnons à quatre pattes sont
          parmi les plus précieux de nos vies.
        </b>
        Chaque sortie devient une aventure, chaque promenade un voyage au
        royaume de la nature, de la découverte et du plaisir. Si vous avez eu la
        chance de découvrir un lieu de sortie extraordinaire en compagnie de
        votre chien, alors vous détenez un trésor d&apos;expériences à partager
        avec le monde.
      </p>
      <p className="mt-10">
        &#128021; &#x26FA; &#x2705; En partageant vos expériences de sortie avec
        votre chien, vous offrez bien plus qu&apos;une simple recommandation.
        Vous partagez des sourires, des souvenirs et des émotions. Vous invitez
        les autres à découvrir la magie de ces moments simples, mais
        profondément enrichissants. Vos photos pourraient capturer le regard
        curieux de votre chien scrutant un ruisseau pour la première fois, ou
        son excitation palpable en explorant un nouveau sentier. Vos mots
        pourraient inspirer un autre propriétaire de chien à sortir et à
        explorer le monde avec son meilleur ami.
      </p>
      <DestinationForm />
    </section>
  )
}
