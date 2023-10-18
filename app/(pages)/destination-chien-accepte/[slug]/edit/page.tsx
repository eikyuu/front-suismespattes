import FormDestination from '../../../../components/form/FormDestination';
import Title from '@/components/ui/text/Title';

function Page({ params }: { params: { slug: string } }): JSX.Element {
  return (
    <section className='container mx-auto mt-10'>
      <Title className='text-center' balise='h1'>
        Modifier un lieu testé avec mon chien
      </Title>
      <FormDestination slug={params.slug} />
    </section>
  );
}

export default Page;
