import LargeTitle from '../../atoms/largeTitle/largeTitle';
import Card from '../../molecules/card/card';

function Presentation() {
  return (
    <section className='container h-full mx-auto pt-10 pb-10 flex flex-col'>
      <LargeTitle title='Lorem Ipsum dolor sit amet, consecterur adpiscl ekt porin.' />
      <div className='flex flex-col justify-around pt-10 md:flex-row'>
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
