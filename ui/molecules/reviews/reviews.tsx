import MediumTitle from '../../atoms/mediumTitle/mediumTitle';
import Review from '../review/review';

function Reviews({reviews}: any): JSX.Element {
  return (
    <section className='h-full flex flex-col justify-evenly bg-primary md:h-128'>
      <MediumTitle title='Témoignages des utilisateurs' color='text-white' />
      <div className='container mx-auto flex flex-col justify-around md:flex-row'>
        {reviews.slice(0, 3).map((review: any) => (
          <Review key={review.id} name={review.name} content={review.content} />
        ))}
      </div>
    </section>
  );
}

export default Reviews;
