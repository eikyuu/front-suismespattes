import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Text from "@/components/ui/text/Text"
import Title from "@/components/ui/text/Title"

import { forgetPassword } from "@/core/services/authService"
import Loader from "../../loader/loader"
import { forgetPasswordSchema } from '@/core/lib/validations/forgetPassword'

function FormForgetPassword() {
  const router = useRouter()

  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (form: z.infer<typeof forgetPasswordSchema>) => {
      return forgetPassword(form)
    },
    onSuccess: () => {
      router.push(`forget-password/confirm-code`)
      toast.success("Si cette adresse email existe, un email vous a été envoyé")
    },
    onError: () => {
      toast.error(
        "Une erreur est survenue veuillez réessayer ou contactez l'administrateur'"
      )
    },
  })

  function onSubmit(values: z.infer<typeof forgetPasswordSchema>) {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <div className="mb-5 flex items-center justify-center gap-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary">
          1
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          2
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          3
        </div>
      </div>
      <Title className="text-white" balise="h3">
        Où devons‑nous envoyer un code de confirmation ?
      </Title>
      <Text className="mb-5">
        Pour que vous puissiez modifier votre mot de passe, nous devons
        d&apos;abord nous assurer qu&apos;il s&apos;agit bien de vous.Commencez
        par choisir où recevoir un code de confirmation.
      </Text>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Entrez l&apos;adresse email associée à votre compte pour
                modifier votre mot de passe
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="sr-only text-white">
                Entrez l&apos;adresse email associée à votre compte pour
                modifier votre mot de passe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant={"default"}
          className="mb-1 mt-5 !w-full bg-tertiary"
          type="submit"
        >
          {mutation.isPending ? <Loader /> : "Envoi du code de confirmation"}
        </Button>
      </form>
    </Form>
  )
}

export default FormForgetPassword
