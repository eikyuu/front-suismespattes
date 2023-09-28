import Image from 'next/image';
import PresentationContent from './PresentationContent';
import Title from './text/Title';

function Presentation() {
  return (
    <section className='container h-full pt-10 pb-10 w-11/12 md:w-full mx-auto flex flex-col'>
      <Title balise='h1' className='text-center'>
        Suis mes pattes, une plateforme collaborative gratuite pour voyager avec ton chien !
      </Title>
      <div className='w-11/12 mx-auto flex flex-col items-center space-y-4 md:space-y-0 justify-between text-center pt-10 md:flex-row'>
        <div className='flex flex-col xl:h-72 justify-between md:mr-10 last:mr-0 md:w-1/4'>
          <Image src='/images/head-dog-1.png' alt='logo du site Suis mes pattes' className='self-center' width={60} height={65} />
          <PresentationContent
            title='Trouve ta destination idéale'
            text='Que ce soit pour une sortie en forêt, en ville ou à la campagne ou encore au restaurant, nous avons ce qu’il te faut !'
          />
          <p className='text-white'>Prochainement</p>
        </div>
        <div className=' flex flex-col xl:h-72 justify-between md:mr-10 last:mr-0 md:w-1/4'>
          <Image src='/images/head-dog-2.png' alt='logo du site Suis mes pattes' className='self-center' width={60} height={60} />
          <PresentationContent
            title='Partage tes destinations'
            text='Tu as trouvé une super destination ? Partage-la avec la communauté ! Tu peux aussi noter les destinations que tu as faites.'
          />
          <p>Prochainement</p>
        </div>
        <div className='flex flex-col xl:h-72 justify-between md:mr-10 last:mr-0 md:w-1/4'>
          <Image src='/images/head-dog-3.png' alt='logo du site Suis mes pattes' className='self-center' width={60} height={60} />
          <PresentationContent
            title='Organise tes sorties avec tes amis'
            text='Tu peux créer un groupe avec tes amis et organiser des sorties ensemble.'
          />
          <p>Prochainement</p>
        </div>
        <div className='flex flex-col xl:h-72  justify-between md:mr-10 last:mr-0 md:w-1/4'>
          <Image src='/images/head-dog-4.png' alt='logo du site Suis mes pattes' className='self-center' width={50} height={50} />
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
