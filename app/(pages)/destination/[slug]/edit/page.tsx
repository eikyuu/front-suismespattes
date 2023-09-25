import FormDestination from '../../../../components/form/FormDestinations';
import Title from '../../../../components/text/Title';

function Page({
    params,
  }: {
    params: { slug: string };
  }): JSX.Element {
    return ( 
        <main className='container mx-auto w-11/12'>
            <section className='mt-10'>
                <Title className='text-center' balise='h1'>
                  Modifier un lieu testé avec mon chien
                </Title>
                <FormDestination slug={params.slug} />
            </section>
        </main>
     );
}

export default Page;