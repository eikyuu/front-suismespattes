import React from 'react';
import Review from './Review';
import LoaderReviews from '../loader/LoaderReviews';
import Title from '../text/Title';
function Reviews({reviews}: any): JSX.Element {
  
  return (
    <section className='h-full pt-10 pb-10 md:h-100 flex flex-col justify-center bg-primary'>
      <Title title='L&apos;avis des canipotes' className='text-white text-center mb-20' balise='h2' />
      
      {reviews.length === 0 && <LoaderReviews />}

      <div className='container mx-auto w-11/12 flex flex-col items-center justify-between md:flex-row'>
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
