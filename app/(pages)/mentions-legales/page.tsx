'use client';

import Link from 'next/link';
import GreenContainer from '../../components/GreenContainer';
import LargeTitle from '../../components/text/LargeTitle';

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
            Le site <span className='font-semibold'>aufildespattes.com </span>
            est édité par <span className='font-semibold'> Vincent Duguet</span>.
          </p>
          <ul>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>Email:</span>{' '}
              <a className='underline' href="mailto:v.duguet.dev@gmail.com">v.duguet.dev@gmail.com</a>
            </li>
          </ul>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            2. DIRECTEUR DE LA PUBLICATION
          </h2>
          <p className='text-white text-lg mt-10'>
            Le directeur de la publication du site
            <span className='font-semibold'> aufildespattes.com</span> est
            <span className='font-semibold'> Vincent Duguet</span>.
          </p>
          <ul>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>Email:</span>{' '}
              <a className='underline' href="mailto:v.duguet.dev@gmail.com">v.duguet.dev@gmail.com</a>
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
              <span className='font-semibold'>Email:</span> <a className='underline' href="mailto:privacy@vercel.com">privacy@vercel.com</a>
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
            4. COOKIES
          </h2>
          <p className='text-white text-lg mt-10'>
            Le site <span className='font-semibold'>aufildespattes.com</span>  utilise des cookies permettent
            d’optimiser la connexion et de personnaliser l’utilisation du site.
            L’internaute peut refuser l’utilisation des cookies en configurant
            les paramètres de son navigateur Internet. Cependant le fait de ne
            pas autoriser les cookies peut rendre indisponibles toutes ou
            certaines parties du site.
          </p>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            5. LOI APPLICABLE ET JURIDICTION COMPÉTENTE
          </h2>
          <p className='text-white text-lg mt-10'>
            Les présentes mentions légales sont soumises au droit applicable
            dans votre pays. En cas de litige, les tribunaux compétents sont
            ceux de Tours.
          </p>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10'>
            6 . CONTACT
          </h2>
          <p className='text-white text-lg mt-10'>
            Pour toute question ou demande concernant le site <span className='font-semibold'>aufildespattes.com </span> 
            ou ces mentions légales, veuillez nous contacter:
          </p>
          <ul>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>Email:</span>{' '}
              <a  className='underline' href="mailto:v.duguet.dev@gmail.com">v.duguet.dev@gmail.com</a>
            </li>
            <li className='text-white text-lg list-disc ml-10'>
              <span className='font-semibold'>
                Formulaire de contact:{' '}
              </span>
              <Link className='underline' href='/contact'>Contact</Link>
            </li>
          </ul>

          <p className='text-white text-lg mt-10'>
            <span className='font-semibold'>Conditions générales d&apos;utilisation</span> : <Link className='underline' href='/conditions-generales-utilisation'>Lire les CGU</Link>
          </p>
        </div>
      </GreenContainer>
    </main>
  );
}
