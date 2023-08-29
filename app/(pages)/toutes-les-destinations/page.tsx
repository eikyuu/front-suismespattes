import { Metadata } from 'next';
import Destinations from '../../components/Destinations';

export const metadata: Metadata = {
  title: 'Toutes les destinations',
  description: 'Retrouve toutes les destinations autours de chez toi !',
};

export default function Page() {
  return (
    <main className='w-11/12 mx-auto'>
      <Destinations />
    </main>
  );
}
