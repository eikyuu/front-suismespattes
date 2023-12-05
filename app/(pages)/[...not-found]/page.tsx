import Link from "next/link"

import Text from "@/components/ui/text/Text"
import Title from "@/components/ui/text/Title"
import BlurImage from '../../../components/blurImage/blur-image'

export default function NotFound() {
  return (
    <section className="container mx-auto flex w-11/12 flex-col items-center justify-center md:w-1/2">
      <Title className="mt-10 text-center" balise="h1">
        &#128561; 404 Page non trouvée &#128561;
      </Title>

      <Text type="gray" className="my-10">
        Pourquoi les chiens détestent-ils les pages 404 ? Parce qu&apos;ils
        préfèrent les pages &quot;au poil&quot; ! 🐶📄
      </Text>

      <BlurImage
        height="h-96"
        image={"/images/corgi.jpg"}
        alt="Une image de corgi"
      />
      <Link className="mt-10" href="/">
        Retour à l&apos;accueil
      </Link>
    </section>
  )
}
