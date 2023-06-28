import MediumTitle from '../../atoms/mediumTitle/mediumTitle';
import MapWalk from '../../molecules/mapWalk/mapWalk';

function WalkMap({ dogWalk, coordinates, title }: { dogWalk: any; coordinates: any; title: string }) {
  return (
    <section className='bg-primary h-full mx-auto pt-10 pb-10 flex flex-col md:justify-evenly'>
      <MediumTitle
        title={title}
        color='text-white'
      />
      <div className='container mx-auto pt-10 w-11/12 md:w-1/2'>
        <MapWalk dogWalk={dogWalk} coordinates={coordinates} />
      </div>
    </section>
  );
}

export default WalkMap;
