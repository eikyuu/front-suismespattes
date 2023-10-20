import Image from 'next/image';
import PresentationContent from '@/components/presentation-content';
import Title from '@/components/ui/text/Title';

function Presentation() {
  return (
    <section className='container h-full pt-10 pb-10 w-11/12 md:w-full mx-auto flex flex-col flex-wrap justify-center lg:h-160 lg:pt-0 lg:pb-0'>
      <Title balise='h1' className='text-center mb-10'>
        Suis mes pattes, une plateforme collaborative gratuite pour voyager avec
        ton chien !
      </Title>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center text-center'>
        <div className='flex flex-col xl:h-full'>
          <Image
            src='/images/head-dog-1.webp'
            alt='logo du site Suis mes pattes'
            className='self-center mb-10'
            width={60}
            height={65}
          />
          <PresentationContent
            title='Trouve ta destination idéale'
            text='Que ce soit pour une sortie en forêt, en ville ou à la campagne ou encore au restaurant, nous avons ce qu’il te faut !'
          />
          {/* <p className='text-white'>Prochainement</p> */}
        </div>
        <div className=' flex flex-col xl:h-full justify-between'>
          <Image
            src='/images/head-dog-2.webp'
            alt='logo du site Suis mes pattes'
            className='self-center mb-10'
            width={60}
            height={60}
          />
          <PresentationContent
            title='Partage tes destinations'
            text='Tu as trouvé une super destination ? Partage-la avec la communauté ! Tu peux aussi noter les destinations que tu as faites.'
          />
          <p>Prochainement</p>
        </div>
        <div className='flex flex-col xl:h-full justify-between'>
          <Image
            src='/images/head-dog-3.webp'
            alt='logo du site Suis mes pattes'
            className='self-center mb-10'
            width={60}
            height={60}
          />
          <PresentationContent
            title='Organise tes sorties avec tes amis'
            text='Tu peux créer un groupe avec tes amis et organiser des sorties ensemble.'
          />
          <p>Prochainement</p>
        </div>
        <div className='flex flex-col xl:h-full  justify-between'>
          <Image
            src='/images/head-dog-4.webp'
            alt='logo du site Suis mes pattes'
            className='self-center mb-10'
            width={50}
            height={50}
          />
          <PresentationContent
            title='La boutique'
            text='Nous choisissons les meilleurs produits pour vous et votre chien et nous les listons en un seul endroit : dans notre boutique.'
          />
          <p>Prochainement</p>
        </div>
      </div>
    </section>
  );
}

export default Presentation;
