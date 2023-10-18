import React from 'react';
import Review from './Review';
import LoaderReviews from '../loader/LoaderReviews';
import Title from '@/components/ui/text/Title';
function Reviews({reviews}: any): JSX.Element {
  
  return (
    <section className='h-full pt-10 pb-10 xl:h-100 flex flex-col justify-center bg-primary'>
      <Title className='text-white text-center mb-10' balise='h2'>
        L&apos;avis des canipotes
      </Title>
      
      {reviews.length === 0 && <LoaderReviews />}

      <div className='container mx-auto flex flex-col items-center justify-between lg:flex-row'>
        {reviews.slice(0, 3).map((review: any) => (
          <div key={review.id} className='mb-10 last:mb-0 md:mb-0'>
            <Review  name={review.name} content={review.content} image={review.image} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
