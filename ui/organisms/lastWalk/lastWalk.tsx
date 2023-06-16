import LargeTitle from '../../atoms/largeTitle/largeTitle';
import CardWalk from '../../molecules/cardWalk/cardWalk';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { useEffect, useState } from 'react';
function LastWalk({ dogWalk }: { dogWalk: any }): JSX.Element {
  //detect if the user is on mobile or not
  const [isMobile, setIsMobile] = useState(false);

  //detect resize of the window to change the isMobile state if needed

  const handleResize = () => {
    window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
  };
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <section className='h-full w-11/12 mx-auto pt-10 pb-10'>
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={16}
            className='w-full h-full'
          >
            {dogWalk.slice(0, 4).map((dogWalk: any) => (
              <SwiperSlide key={dogWalk.id} className='!w-11/12 last:w-full'>
                <CardWalk
                  city={dogWalk.city}
                  description={dogWalk.description}
                  slug={dogWalk.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      ) : (
        <section className='h-full w-11/12 mx-auto flex flex-col justify-evenly pt-10 pb-10'>
          <LargeTitle title='Les dernieres balade' />
          <div className='container mx-auto flex flex-col flex-wrap justify-between pt-10 md:flex-row'>
            {dogWalk.slice(0, 4).map((dogWalk: any) => (
              <CardWalk
                key={dogWalk.id}
                city={dogWalk.city}
                description={dogWalk.description}
                slug={dogWalk.slug}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default LastWalk;
