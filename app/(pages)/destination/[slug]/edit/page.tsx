import FormDestination from '../../../../components/form/formDestination';
import LargeTitle from '../../../../components/text/LargeTitle';

function Page({
    params,
  }: {
    params: { slug: string };
  }): JSX.Element {
    return ( 
        <main className='container mx-auto w-11/12'>
            <section className='mt-10'>
                <LargeTitle title='Modifier un lieu testé avec mon chien' />
                <FormDestination slug={params.slug} />
            </section>
        </main>
     );
}

export default Page;