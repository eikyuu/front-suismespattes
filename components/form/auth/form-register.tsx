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
import Title from "@/components/ui/text/Title"

import { register } from "../../../@core/services/authService"
import Loader from "../../loader/loader"
import Text from "../../ui/text/Text"
import { registerSchema } from '../../../@core/lib/validations/register'

function FormRegister() {
  const router = useRouter()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      pseudo: "",
      email: "",
      password: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (form: z.infer<typeof registerSchema>) => {
      return register(form)
    },
    onSuccess: () => {
      router.back()
    },
    onError: () => {
      toast.error(
        "Une erreur est survenue lors de l'inscription veuillez réessayer ou contactez l'administrateur"
      )
    },
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <Title className="text-white" balise="h3">
        Inscription
      </Title>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="pseudo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Votre pseudo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="sr-only text-white">
                Entrez votre pseudo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Votre email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="sr-only text-white">
                Entrez votre email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Votre mot de passe</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormDescription className="sr-only text-white">
                Entrez votre mot de passe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Text className="mt-5 text-sm">
          Assurez‑vous que votre mot de passe contient huit caractères ou plus.
          Pour disposer d&apos;un mot de passe fort, essayez d&apos;inclure des
          chiffres, des lettres et des signes de ponctuation.
        </Text>

        <Button
          variant={"default"}
          className="mb-1 mt-5 !w-full bg-tertiary"
          type="submit"
        >
          {mutation.isPending ? <Loader /> : "Inscription"}
        </Button>
      </form>
    </Form>
  )
}

export default FormRegister
