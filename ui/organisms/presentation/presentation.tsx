import LargeTitle from '../../atoms/largeTitle/largeTitle';
import Card from '../../molecules/card/card';

function Presentation() {
  return (
    <section className='container h-full w-11/12 md:w-full mx-auto pt-10 pb-10 flex flex-col'>
      <LargeTitle title='Au fil des pattes, une application pour voyager avec ton chien !' />
      <div className='w-11/12 mx-auto flex flex-col items-center space-y-4 md:space-y-0 justify-between text-center pt-10 md:flex-row'>
        <div className='flex flex-col xl:h-40 justify-between md:mr-10 last:mr-0 md:w-1/4'>
          <Card
            title='Trouve ta balade idéale'
            text='Que ce soit pour une balade en forêt, en ville ou à la campagne, nous avons ce qu’il te faut.'
          />
        </div>
        <div className=' flex flex-col xl:h-40 justify-between md:mr-10 last:mr-0 md:w-1/4'>
          <Card
            title='Partage tes balades'
            text='Tu as trouvé une super balade ? Partage-la avec la communauté ! Tu peux aussi noter les balades que tu as faites.'
          />
          <p>Prochainement</p>
        </div>
        <div className='flex flex-col xl:h-40 justify-between md:mr-10 last:mr-0 md:w-1/4'>
          <Card
            title='Organise tes balades avec tes amis'
            text='Tu peux créer un groupe avec tes amis et organiser des balades ensemble.'
          />
          <p>Prochainement</p>
        </div>
        <div className='flex flex-col xl:h-40 justify-between md:mr-10 last:mr-0 md:w-1/4'>
          <Card
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
