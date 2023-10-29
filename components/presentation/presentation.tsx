import Title from '@/components/ui/text/Title';
import PresentationBloc from './presentation-bloc';

function Presentation() {
  return (
    <section className='container h-full mt-10 mb-10 w-11/12 md:w-full mx-auto flex flex-col justify-center'>
      <Title balise='h1' className='text-center'>
        Suis mes pattes, une plateforme collaborative gratuite pour voyager avec ton chien !
      </Title>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-center text-center'>
        <PresentationBloc
          title='Trouve ta destination idéale'
          text='Que ce soit pour une sortie en forêt, en ville ou à la campagne ou encore au restaurant, nous avons ce qu’il te faut !'
          image='/images/head-dog-1.webp'
          next={false}
          width={60}
          height={65}
        />

        <PresentationBloc
          className='justify-between'
          title='Partage tes destinations'
          text='Tu as trouvé une super destination ? Partage-la avec la communauté ! Tu peux aussi noter les destinations que tu as faites.'
          image='/images/head-dog-2.webp'
          next={true}
          width={60}
          height={60}
        />

        <PresentationBloc
          className='justify-between'
          title='Organise tes sorties avec tes amis'
          text='Tu peux créer un groupe avec tes amis et organiser des sorties ensemble.'
          image='/images/head-dog-3.webp'
          next={true}
          width={60}
          height={60}
        />

        <PresentationBloc
          className='justify-between'
          title='La boutique'
          text='Nous choisissons les meilleurs produits pour vous et votre chien et nous les listons en un seul endroit : dans notre boutique.'
          image='/images/head-dog-4.webp'
          next={true}
          width={50}
          height={50}
        />
      </div>
    </section>
  );
}

export default Presentation;
