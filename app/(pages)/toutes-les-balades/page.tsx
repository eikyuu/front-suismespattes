import { Metadata } from 'next';
import PageWalk from '../../../composants/pageWalk';

export const metadata: Metadata = {
  title: 'Toutes les balades',
  description: 'Retrouve toutes les balades autours de chez toi !',
};

export default function Page() {
  return (
    <main className='font-sans w-11/12 mx-auto'>
      <PageWalk />
    </main>
  );
}
