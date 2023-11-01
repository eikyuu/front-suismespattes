"use client"

import Link from "next/link"

import Title from "@/components/ui/text/Title"
import TitleUnderline from "@/components/ui/text/TitleUnderline"
import GreenContainer from "@/components/green-container"

export default function Page() {
  return (
    <div className="container mx-auto mt-10 w-11/12">
      <GreenContainer>
        <Title className="text-center text-white" balise="h1">
          MENTIONS LEGALES
        </Title>
        <div className="text-start text-white">
          <TitleUnderline title="1. EDITEUR DU SITE" balise="h2" />
          <p className="mt-10 text-lg text-white">
            Le site <span className="font-semibold">suismespattes.com </span>
            est édité par <span className="font-semibold"> Vincent Duguet</span>
            .
          </p>
          <ul>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">Email:</span>{" "}
              <a className="underline" href="mailto:v.duguet.dev@gmail.com">
                v.duguet.dev@gmail.com
              </a>
            </li>
          </ul>
          <TitleUnderline title="2. DIRECTEUR DE LA PUBLICATION" balise="h2" />
          <p className="mt-10 text-lg text-white">
            Le directeur de la publication du site
            <span className="font-semibold"> suismespattes.com</span> est
            <span className="font-semibold"> Vincent Duguet</span>.
          </p>
          <ul>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">Email:</span>{" "}
              <a className="underline" href="mailto:v.duguet.dev@gmail.com">
                v.duguet.dev@gmail.com
              </a>
            </li>
          </ul>
          <TitleUnderline title="3. HÉBERGEUR DU SITE" balise="h2" />
          <p className="mt-10 text-lg text-white">
            Le site <span className="font-semibold">suismespattes.com</span> est
            hébergé par <span className="font-semibold">Vercel Inc</span>
          </p>
          <ul>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">Email:</span>{" "}
              <a className="underline" href="mailto:privacy@vercel.com">
                privacy@vercel.com
              </a>
            </li>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">Téléphone:</span> 347-757-2499
            </li>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">Adresse:</span> 440 N Barranca Ave
              #4133, Covina, CA 91723
            </li>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">Site:</span>{" "}
              <a href="https://www.vercel.com">Vercel Inc</a>
            </li>
          </ul>
          <TitleUnderline title="4. COOKIES" balise="h2" />
          <p className="mt-10 text-lg text-white">
            Le site <span className="font-semibold">suismespattes.com</span>{" "}
            utilise des cookies permettent d’optimiser la connexion et de
            personnaliser l’utilisation du site. L’internaute peut refuser
            l’utilisation des cookies en configurant les paramètres de son
            navigateur Internet. Cependant le fait de ne pas autoriser les
            cookies peut rendre indisponibles toutes ou certaines parties du
            site.
          </p>
          <TitleUnderline
            title="5. LOI APPLICABLE ET JURIDICTION COMPÉTENTE"
            balise="h2"
          />
          <p className="mt-10 text-lg text-white">
            Les présentes mentions légales sont soumises au droit applicable
            dans votre pays. En cas de litige, les tribunaux compétents sont
            ceux de Tours.
          </p>
          <TitleUnderline title="6. CONTACT" balise="h2" />
          <p className="mt-10 text-lg text-white">
            Pour toute question ou demande concernant le site{" "}
            <span className="font-semibold">suismespattes.com </span>
            ou ces mentions légales, veuillez nous contacter:
          </p>
          <ul>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">Email:</span>{" "}
              <a className="underline" href="mailto:v.duguet.dev@gmail.com">
                v.duguet.dev@gmail.com
              </a>
            </li>
            <li className="ml-10 list-disc text-lg text-white">
              <span className="font-semibold">Formulaire de contact: </span>
              <Link className="underline" href="/contact">
                Contact
              </Link>
            </li>
          </ul>

          <p className="mt-10 text-lg text-white">
            <span className="font-semibold">
              Conditions générales d&apos;utilisation
            </span>{" "}
            :{" "}
            <Link
              className="underline"
              href="/conditions-generales-utilisation"
            >
              Lire les CGU
            </Link>
          </p>
        </div>
      </GreenContainer>
    </div>
  )
}
