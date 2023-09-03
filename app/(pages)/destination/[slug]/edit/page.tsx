import FormDestination from '../../../../components/form/formDestination';
import LargeTitle from '../../../../components/text/LargeTitle';

function Page({
    params,
  }: {
    params: { slug: string };
  }): JSX.Element {
    console.log(params.slug);
    return ( 
        <main className='container mx-auto w-11/12'>
            <section className='mt-10'>
                <LargeTitle title='EDITER UN LIEU TESTÉ AVEC MON CHIEN' />
                <FormDestination slug={params.slug} />
            </section>
        </main>
     );
}

export default Page;