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

import { confirmCode } from "../../../@core/services/authService"
import Loader from "../../loader/loader"
import Text from "../../ui/text/Text"

const formSchema = z.object({
  resetToken: z.string(),
})

function FormConfirmCode() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resetToken: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (form: z.infer<typeof formSchema>) => {
      return confirmCode(form)
    },
    onSuccess: () => {
      router.push(`reset-password?resetToken=${form.getValues("resetToken")}`)
    },
    onError: () => {
      toast.error("Code incorrect ou expiré")
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <div className="mb-5 flex items-center justify-center gap-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          1
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary">
          2
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          3
        </div>
      </div>
      <Title className="text-white" balise="h3">
        Nous vous avons envoyé un code
      </Title>
      <Text className="mb-5">
        Consultez vos emails pour récupérer votre code de confirmation. Si vous
        devez demander un nouveau code, revenez en arrière et sélectionnez de
        nouveau une méthode de confirmation.
      </Text>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="resetToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Entrez le code de confirmation
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="sr-only text-white">
                Entrez le code de confirmation envoyé par email
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

export default FormConfirmCode
