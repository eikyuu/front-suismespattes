import Text from "@/components/ui/text/Text"
import TextWithQuote from "@/components/ui/text/TextWithQuote"

import BlurImageRounded from "../blurImage/blur-image-rounded"

interface ReviewProps {
  name: string
  content: string
  image: string
}
function Review({ name, content, image }: ReviewProps): JSX.Element {
  return (
    <div className="container flex w-full flex-col items-center xl:flex-row">
      <BlurImageRounded image={image} alt="Photo d'une personne" />
      <div className=" mx-auto w-11/12 md:w-48 lg:ml-4">
        <Text type="bold" className="text-white">
          {name}
        </Text>
        <TextWithQuote content={content} />
      </div>
    </div>
  )
}
export default Review
