import MapContent from './MapContent';
import MediumTitle from '../text/MediumTitle';

function MapContainer({ dogDestination, coordinates, title }: { dogDestination: any; coordinates: any; title: string }) {
  return (
    <section className='bg-primary h-full mx-auto pt-10 pb-10 flex flex-col md:justify-evenly'>
      <MediumTitle
        title={title}
        color='text-white'
      />
      <div className='container mx-auto pt-10 w-11/12 md:w-1/2'>
        <MapContent dogDestination={dogDestination} coordinates={coordinates}/>
      </div>
    </section>
  );
}

export default MapContainer;
