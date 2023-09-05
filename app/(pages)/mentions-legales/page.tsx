'use client';

import Link from 'next/link';
import GreenContainer from '../../components/GreenContainer';
import LargeTitle from '../../components/text/LargeTitle';
import MediumTitle from '../../components/text/MediumTitle';

export default function Page() {
  return (
    <main className='container mx-auto w-11/12 mt-10'>
      <GreenContainer>
        <LargeTitle title='Mentions légales' color='text-white' />
        <div className='text-white text-start'>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            1. ÉDITEUR DU SITE
          </h2>
          <p className='text-white text-lg mt-10'>
            Le site <span className='font-semibold'>aufildespattes.com</span>{' '}
            est édité par <span className='font-semibold'>Vincent Duguet</span>
          </p>
          <ul>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>Email:</span>{' '}
              v.duguet.dev@gmail.com
            </li>
          </ul>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            2. DIRECTEUR DE LA PUBLICATION
          </h2>
          <p className='text-white text-lg mt-10'>
            Le directeur de la publication du site{' '}
            <span className='font-semibold'>aufildespattes.com</span> est
            Vincent Duguet.
          </p>
          <ul>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>Email:</span>{' '}
              v.duguet.dev@gmail.com
            </li>
          </ul>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            3. HÉBERGEUR DU SITE
          </h2>
          <p className='text-white text-lg mt-10'>
            Le site <span className='font-semibold'>aufildespattes.com</span>{' '}
            est hébergé par <span className='font-semibold'>Vercel Inc</span>
          </p>
          <ul>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>Email:</span> privacy@vercel.comm
            </li>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>Téléphone:</span> 347-757-2499
            </li>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>Adresse:</span> 440 N Barranca Ave
              #4133, Covina, CA 91723
            </li>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>Site:</span>{' '}
              <a href='https://www.vercel.com'>Vercel Inc</a>
            </li>
          </ul>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            4. PROPRIÉTÉ INTELLECTUELLE
          </h2>
          <p className='text-white text-lg mt-10'>
            Tous les contenus présents sur le site aufildespattes.com (textes,
            images, vidéos, logos, etc.) sont protégés par le droit
            d&apos;auteur et/ou d&apos;autres droits de propriété
            intellectuelle. Toute reproduction, diffusion ou utilisation de ces
            contenus sans autorisation écrite préalable de l&apos;éditeur est
            strictement interdite.
          </p>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            5. COLLECTE DE DONNÉES PERSONNELLES
          </h2>
          <p className='text-white text-lg mt-10'>
            Lors de l&apos;utilisation du site aufildespattes.com, des données
            personnelles peuvent être collectées. Le Site assure à l’Utilisateur
            une collecte et un traitement d’informations personnelles dans le
            respect de la vie privée conformément à la loi n°78-17 du 6 janvier
            1978 relative à l’informatique, aux fichiers et aux libertés. En
            vertu de la loi Informatique et Libertés, en date du 6 janvier 1978,
            l’Utilisateur dispose d’un droit d’accès, de rectification, de
            suppression et d’opposition de ses données personnelles.
            L’Utilisateur exerce ce droit :
          </p>
          <ul>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>Email:</span>{' '}
              v.duguet.dev@gmail.com
            </li>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>
                Par le formulaire de contact:
              </span>{' '}
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            6. COOKIES
          </h2>
          <p className='text-white text-lg mt-10'>
            Le site aufildespattes.com utilise des cookies permettent
            d’optimiser la connexion et de personnaliser l’utilisation du site.
            L’internaute peut refuser l’utilisation des cookies en configurant
            les paramètres de son navigateur Internet. Cependant le fait de ne
            pas autoriser les cookies peut rendre indisponibles toutes ou
            certaines parties du site.
          </p>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            7. VERSION DU NAVIGATEUR ET AFFCHAGE
          </h2>
          <p className='text-white text-lg mt-10'>
            Le site a été conçu en responsive design afin de s’adapter aux
            différents types de supports actuels (smartphone, tablette et
            ordinateur…), à partir des navigateurs suivants : Firefox, Chrome,
            Safari & Edge. Cependant, les divergences d’interprétation des codes
            d’un navigateur à l’autre peuvent entraîner des différences de
            présentation et de navigation. Si votre navigateur ne correspond pas
            à ces critères, vous pouvez télécharger les dernières versions des
            navigateurs précités sur le site. Nous ne garantissons pas le
            fonctionnement du site avec d’autres versions de navigateurs
          </p>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            8. LOI APPLICABLE ET JURIDICTION COMPÉTENTE
          </h2>
          <p className='text-white text-lg mt-10'>
            Les présentes mentions légales sont soumises au droit applicable
            dans votre pays. En cas de litige, les tribunaux compétents sont
            ceux de Tours.
          </p>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            9. CONTACT
          </h2>
          <p className='text-white text-lg mt-10'>
            Pour toute question ou demande concernant le site aufildespattes.com
            ou ces mentions légales, veuillez nous contacter:
          </p>
          <ul>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>Email:</span>{' '}
              v.duguet.dev@gmail.com
            </li>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>
                Par le formulaire de contact:
              </span>{' '}
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
      </GreenContainer>
    </main>
  );
}
