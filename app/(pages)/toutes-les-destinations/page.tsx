import { Metadata } from 'next';
import PageWalk from '../../components/PageWalk';

export const metadata: Metadata = {
  title: 'Toutes les lieux',
  description: 'Retrouve toutes les lieux autours de chez toi !',
};

export default function Page() {
  return (
    <main className='w-11/12 mx-auto'>
      <PageWalk />
    </main>
  );
}
