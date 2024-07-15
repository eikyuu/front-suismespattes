import Title from "@/components/ui/text/Title"

import PresentationBloc from "./presentation-bloc"

function Presentation() {
  return (
    <section className="container mx-auto my-10 flex h-full w-11/12 flex-col justify-center md:w-full">
      <Title balise="h1" className="text-center">
        Suis mes pattes, une plateforme collaborative gratuite pour voyager avec
        ton chien !
      </Title>
      <div className="grid grid-cols-1 items-center text-center md:grid-cols-2 xl:grid-cols-4">
        <PresentationBloc
          title="Trouve ta destination idéale"
          text="Que ce soit pour une sortie en forêt, en ville ou à la campagne ou encore au restaurant, nous avons ce qu’il te faut !"
          image="/images/head-dog-1.webp"
          next={false}
          width={60}
          height={65}
        />

        <PresentationBloc
          className="justify-between"
          title="Partage tes destinations"
          text="Tu as trouvé une super destination ? Partage-la avec la communauté ! Tu peux aussi noter les destinations que tu as faites."
          image="/images/head-dog-2.webp"
          next={true}
          width={60}
          height={60}
        />

        <PresentationBloc
          className="justify-between"
          title="Organise tes sorties avec tes amis"
          text="Tu peux créer un groupe avec tes amis et organiser des sorties ensemble."
          image="/images/head-dog-3.webp"
          next={true}
          width={60}
          height={60}
        />

        <PresentationBloc
          className="justify-between"
          title="La boutique"
          text="Nous choisissons les meilleurs produits pour vous et votre chien et nous les listons en un seul endroit : dans notre boutique."
          image="/images/head-dog-4.webp"
          next={true}
          width={50}
          height={50}
        />
      </div>
    </section>
  )
}

export default Presentation
