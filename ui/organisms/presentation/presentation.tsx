import LargeTitle from '../../atoms/largeTitle/largeTitle';
import Card from '../../molecules/card/card';

function Presentation() {
  return (
    <section className='container h-full mx-auto pt-4 pb-4 flex flex-col md:h-128 md:justify-evenly md:pt-0 md:pb-0'>
      <LargeTitle title='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.' />
      <div className='flex flex-col justify-around md:flex-row'>
        <div className="w-1/4 mr-10 last:mr-0">
          <Card
            title='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.'
            text='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin. Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin. Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.'
          />
        </div>
        <div className="w-1/4 mr-10 last:mr-0">
          <Card
            title='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.'
            text='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin. Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin. Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.'
          />
        </div>
        <div className="w-1/4 mr-10 last:mr-0">
          <Card
            title='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.'
            text='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin. Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin. Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.'
          />
        </div>
        <div className="w-1/4 mr-10 last:mr-0">
          <Card
            title='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.'
            text='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin. Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin. Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.'
          />
        </div>
      </div>
    </section>
  );
}

export default Presentation;
