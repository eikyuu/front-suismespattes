'use client';
import Title from '@/components/ui/text/Title';
import Text from '@/components/ui/text/Text';
import CardDestinations from './card-destinations';
import { Fragment } from 'react';
import { Button } from './ui/button';
import PopoverCity from './popover-city';
import Link from 'next/link';

export default function Destinations() {
  return (
    <Fragment>
      <section className='container'>
        <Title balise='h1' className='text-center mb-10 mt-10'>
          Toutes les destinations
        </Title>
        <Text className='text-black'>
          À la recherche d&apos;une aventure inoubliable à partager avec votre
          fidèle compagnon canin lors de vos prochaines vacances ? Vous êtes au
          bon endroit.
        </Text>
        <Text className='mt-5 mb-5'>
          &#128021; &#x26FA; &#x2705; Que vous soyez amateurs de plein air,
          d&apos;exploration ou de découvertes culturelles, il existe une
          myriade d&apos;options pour vous et votre chien. Dites adieu à
          l&apos;idée de laisser votre compagnon à quatre pattes derrière vous,
          car de nombreux endroits vous accueillent à bras ouverts, prêts à vous
          offrir une expérience mémorable ensemble.
        </Text>
        <Text className='mt-5 mb-10'>
          Partez à l&apos;aventure en France avec votre fidèle compagnon canin.
          Des plages de Normandie aux montagnes des Alpes, découvrez ensemble
          des trésors cachés et vivez une escapade inoubliable. 🐾🇫🇷
        </Text>
      </section>

      <Text className='container text-center text-black mb-5 md:text-left'  type='bold'>
        Vous cherchez une destination en particulier ?
      </Text>

      <div className='md:container '>
        <div className='flex flex-col md:flex-row justify-between bg-tertiary mb-10 md:rounded-md p-4'>
        <PopoverCity />
          {/* <Text className='text-white'>+ de filtres</Text> */}
          <Link
            className='mt-5 md:mt-0 '
            href='/destinations-chien-accepte'
            title='Remettre les filtres à leur valeur par défaut'
          >
            <Button className='w-full md:w-auto' >Rénitialiser</Button>
          </Link>
        </div>
      </div>

      <section className='container'>
        <CardDestinations />
      </section>
    </Fragment>
  );
}
