import React from 'react';
import MediumTitle from './text/mediumTitle';
import Review from './review';
import LoaderReviews from './loader/loaderReviews';
function Reviews({reviews}: any): JSX.Element {
  
  return (
    <section className='h-full flex flex-col justify-evenly bg-primary pt-10 pb-10'>
      <MediumTitle title='Témoignages des utilisateurs' color='text-white' />
      {reviews.length === 0 && <LoaderReviews />}

      <div className='container mx-auto w-11/12 flex flex-col items-center justify-between pt-10 md:flex-row'>
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
