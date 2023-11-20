import Title from "@/components/ui/text/Title"
import { DestinationForm } from '../../../../../components/form/destination-form'

function Page({ params }: { params: { slug: string } }): JSX.Element {
  return (
    <section className="container mx-auto mt-10">
      <Title className="text-center" balise="h1">
        Modifier un lieu testé avec mon chien
      </Title>
      <DestinationForm slug={params.slug} />
    </section>
  )
}

export default Page
