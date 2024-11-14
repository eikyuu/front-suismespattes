import { useRouter, useSearchParams } from "next/navigation"
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

import { resetPassword } from "@/core/services/authService"
import Loader from "../../loader/loader"
import { resetPasswordSchema } from '@/core/lib/validations/resetPassword'

function FormResetPassword() {
  const searchParams = useSearchParams()

  const resetToken = searchParams.get("resetToken") as string

  const router = useRouter()

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (form: z.infer<typeof resetPasswordSchema>) => {
      return resetPassword(form, resetToken)
    },
    onSuccess: () => {
      router.push(``)
      toast.success("Mot de passe modifié avec succès")
    },
    onError: () => {
      toast.error(
        "Une erreur est survenue veuillez réessayer ou contactez l'administrateur"
      )
    },
  })

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <div className="mb-5 flex items-center justify-center gap-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          1
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          2
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary">
          3
        </div>
      </div>
      <Title className="text-white" balise="h3">
        Choisissez un nouveau mot de passe
      </Title>
      <Text>
        Assurez‑vous que votre mot de passe contient huit caractères ou plus.
        Pour disposer d&apos;un mot de passe fort, essayez d&apos;inclure des
        chiffres, des lettres et des signes de ponctuation.
      </Text>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Entrez un nouveau mot de passe
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription className="sr-only text-white">
                Entrez un nouveau mot de passe pour votre compte
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
          {mutation.isPending ? <Loader /> : "Confirmer"}
        </Button>
      </form>
    </Form>
  )
}

export default FormResetPassword
