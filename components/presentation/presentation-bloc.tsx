import Image from "next/image"

import Text from "../ui/text/Text"
import PresentationContent from "./presentation-content"

function PresentationBloc({
  className,
  title,
  text,
  image,
  next,
  width,
  height,
}: {
  className?: string
  title: string
  text: string
  image: string
  next: boolean
  width: number
  height: number
}): JSX.Element {
  return (
    <div className={`${className} flex flex-col xl:h-full`}>
      <Image
        src={image}
        alt="Logo en forme de tête de chien"
        className="my-10 self-center"
        loading="eager"
        width={width}
        height={height}
      />
      <PresentationContent title={title} text={text} />
      {next && <Text className="text-secondary">Prochainement</Text>}
    </div>
  )
}

export default PresentationBloc
