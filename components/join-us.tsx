import Title from "./ui/text/Title"
import Text from "./ui/text/Text"
import Image from "next/image"
import image from "@/public/images/dog-5964181_1280.jpg"
import imageUn from "@/public/images/dog-7395306_1280.jpg"
import imageDeux from "@/public/images/woman-7308033_1280.jpg"
import { Button } from "./ui/button"
import Link from "next/link"

function JoinUs() {
    return (
        <div className="container mt-10 flex flex-col md:h-128 md:flex-row">

            <div className="md:mr-10 md:grid md:w-6/12 md:max-w-5xl md:grid-cols-[2fr_1fr] md:grid-rows-2 md:gap-4">

                <Image
                    className="col-span-1 row-span-2 h-full rounded-lg object-cover"
                    src={image}
                    alt="Un chien debout sur un banc en bois, regardant au loin avec un arrière plan de montagnes et de forêts."
                    loading="eager"
                    priority={true}
                />
                <Image
                    className="hidden h-full rounded-lg object-cover md:block"
                    src={imageUn}
                    alt="Un chien debout sur un banc en bois, regardant au loin avec un arrière plan de montagnes et de forêts."
                    loading="eager"
                    priority={true}
                />
                <Image
                    className="hidden h-full rounded-lg object-cover md:block"
                    src={imageDeux}
                    alt="Un chien debout sur un banc en bois, regardant au loin avec un arrière plan de montagnes et de forêts."
                    loading="eager"
                    priority={true}
                />
            </div>


            <div className="flex flex-col items-center justify-center md:w-6/12">
                <Title
                    balise="h3"
                    className="my-10 scroll-m-20 break-words text-center text-3xl uppercase tracking-tight text-primary md:text-4xl lg:text-5xl"
                >REJOIGNEZ-NOUS !</Title>
                <Text className="mb-5">
                    Suismespattes est une communauté en pleine croissance, avec de nouveaux voyaueur et de nouveaux toutous inscrits tous les jours.
                </Text>
                <Text className="mb-5">
                    Vous avez la possibilité de partager du bonheur près de chez vous, que ce soit pour voyager avec votre chien ou pour trouver un canipotes avec qui partager des moments de joie.
                </Text>
                <Text className="mb-5">
                    Et les toutous ne sont pas en reste : plus de sorties, plus de caresses, plus de jeux… tout ce dont rêve un toutou !
                </Text>
                <Text className="mb-5">
                    Notre communauté est basée sur le respect des chiens, la confiance et l&apos;entraide entre les membres. Le bien-être des toutous est tout aussi important pour nous que celui des humains. Alors, si cela sonne juste à votre oreille, rejoignez nous !
                </Text>
                <Link href="/register">
                    <Button
                        variant={"default"}
                        className="mb-1 mt-5 bg-secondary"
                        type="submit"
                    >
                        CREER MON COMPTE
                    </Button>
                </Link>
            </div>



        </div>
    )
}

export default JoinUs;