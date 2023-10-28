import { ContactForm } from '@/components/form/contact-form';
import GreenContainer from '@/components/green-container';

export default function Page() {
  return (
    <section className='container mx-auto w-11/12 mt-10'>
      <GreenContainer>
        <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-32 before:-bottom-1 before:bg-white relative mb-10'>
          Contact
        </h2>
        <ContactForm />
      </GreenContainer>
    </section>
  );
}
