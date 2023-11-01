import { ContactForm } from "@/components/form/contact-form"
import GreenContainer from "@/components/green-container"

export default function Page() {
  return (
    <section className="container mx-auto mt-10 w-11/12">
      <GreenContainer>
        <h2 className="relative mb-10 text-4xl font-semibold text-white before:absolute before:-bottom-1 before:block before:h-1 before:w-32 before:bg-white">
          Contact
        </h2>
        <ContactForm />
      </GreenContainer>
    </section>
  )
}
