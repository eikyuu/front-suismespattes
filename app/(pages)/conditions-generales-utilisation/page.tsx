"use client"

import Link from "next/link"

import Text from "@/components/ui/text/Text"
import Title from "@/components/ui/text/Title"
import TitleUnderline from "@/components/ui/text/TitleUnderline"
import GreenContainer from "@/components/green-container"

export default function Page() {
  return (
    <div className="container mx-auto mt-5 w-11/12">
      <GreenContainer>
        <Title className="text-center text-white" balise="h1">
          CONDITIONS GÉNÉRALES D&apos;UTILISATION
        </Title>
        <div className="text-start text-white">
          <TitleUnderline title="1. INTRODUCTION" balise="h2" />
          <Text className="mt-5 text-white">
            Les présentes Conditions Générales d&apos;Utilisation (ci-après
            &quot;CGU&quot;) régissent l&apos;utilisation du site web
            suismespattes.com (ci-après le &quot;Site&quot;) et de tous les
            services, fonctionnalités et contenus associés. En accédant au Site
            ou en l&apos;utilisant de quelque manière que ce soit, vous acceptez
            de vous conformer aux présentes CGU.
          </Text>
          <TitleUnderline title="2. UTILISATION DU SITE" balise="h2" />
          <TitleUnderline title="2.1. ACCÈS AU SITE" balise="h3" />
          <Text className="mt-5 text-white">
            Vous êtes responsable de l&apos;accès au Site et de lobtention de
            tout équipement nécessaire pour y accéder.
          </Text>
          <TitleUnderline title="2.2. UTILISATION AUTORISÉE" balise="h3" />
          <Text className="mt-5 text-white">
            Vous vous engagez à utiliser le Site conformément aux lois
            applicables et aux présentes CGU. Vous ne devez pas utiliser le Site
            à des fins illégales, diffamatoires, offensantes ou en violation des
            droits de tiers.
          </Text>
          <TitleUnderline title="2.3. COMPTE UTILISATEUR" balise="h3" />
          <Text className="mt-5 text-white">
            Si vous créez un compte utilisateur sur le Site, vous êtes
            responsable de la confidentialité de vos informations de connexion
            et de l&apos;utilisation de votre compte. Vous acceptez de nous
            informer immédiatement de toute utilisation non autorisée de votre
            compte.
          </Text>
          <TitleUnderline title="3. PROPRIÉTÉ INTELLECTUELLE" balise="h2" />
          <TitleUnderline title="3.1. DROITS D'AUTEUR" balise="h3" />
          <Text className="mt-5 text-white">
            Tous les contenus, textes, images, logos, marques de commerce et
            autres éléments présents sur le Site sont protégés par les lois sur
            les droits d&apos;auteur et autres lois applicables.
          </Text>
          <TitleUnderline title="3.2. LICENCE D'UTILISATION" balise="h3" />
          <Text className="mt-5 text-white">
            Nous vous accordons une licence limitée, non exclusive et révocable
            pour accéder au Site et utiliser son contenu à des fins personnelles
            et non commerciales.
          </Text>
          <TitleUnderline title="4. CONFIDENTIALITÉ" balise="h2" />
          <TitleUnderline
            title="4.1. COLLECTE DE DONNÉES PERSONNELLES"
            balise="h3"
          />
          <Text className="mt-5 text-white">
            Lors de l&apos;utilisation du site suismespattes.com, des données
            personnelles peuvent être collectées. Le Site assure à l’Utilisateur
            une collecte et un traitement d’informations personnelles dans le
            respect de la vie privée conformément à la loi n°78-17 du 6 janvier
            1978 relative à l’informatique, aux fichiers et aux libertés. En
            vertu de la loi Informatique et Libertés, en date du 6 janvier 1978,
            l’Utilisateur dispose d’un droit d’accès, de rectification, de
            suppression et d’opposition de ses données personnelles.
            L’Utilisateur exerce ce droit :
          </Text>
          <ul>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">Email:</span>{" "}
              v.duguet.dev@gmail.com
            </li>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">
                Par le formulaire de contact:
              </span>{" "}
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <TitleUnderline title="5. LIMITATION DE RESPONSABILITÉ" balise="h2" />
          <TitleUnderline title="5.1. EXCLUSION DE GARANTIES" balise="h3" />
          <Text className="mt-5 text-white">
            Le Site est fourni &quot;atel quel&quot;, sans garantie
            d&apos;aucune sorte. Nous déclinons toute responsabilité pour les
            dommages directs, indirects, accessoires ou consécutifs découlant de
            l&apos;utilisation du Site.
          </Text>
          <TitleUnderline title="6. MODIFICATION DES CGU" balise="h2" />
          <TitleUnderline title="6.1. MODIFICATIONS" balise="h3" />
          <Text className="mt-5 text-white">
            Nous nous réservons le droit de modifier ces CGU à tout moment. Les
            modifications prendront effet dès leur publication sur le Site. Il
            vous incombe de consulter régulièrement les CGU pour rester informé
            des mises à jour.
          </Text>
          <TitleUnderline title="7. CONTACT" balise="h2" />
          <Text className="mt-5 text-white">
            Pour toute question ou demande concernant le site suismespattes.com
            ou ces mentions légales, veuillez nous contacter:
          </Text>
          <ul>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">Email:</span>{" "}
              <a className="underline" href="mailto:v.duguet.dev@gmail.com">
                v.duguet.dev@gmail.com
              </a>
            </li>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">
                Par le formulaire de contact:
              </span>{" "}
              <Link className="underline" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </GreenContainer>
    </div>
  )
}
