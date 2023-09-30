import MapContent from './MapContent';
import Title from '../text/Title';

function MapContainer({ dogDestination, coordinates, title }: { dogDestination: any; coordinates: any; title: string }) {
  return (
    <section className='bg-primary h-full md:h-166 mx-auto pt-10 pb-10 flex flex-col md:justify-center'>
      <Title
        className='text-white text-center mb-10'
        balise='h2'
      >
        {title}
      </Title>
      <div className='container mx-auto w-11/12 md:w-1/2'>
        <MapContent dogDestination={dogDestination} coordinates={coordinates}/>
      </div>
    </section>
  );
}

export default MapContainer;
