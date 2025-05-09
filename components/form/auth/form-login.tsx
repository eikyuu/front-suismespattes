import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "next-auth/react"
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

import Loader from "../../loader/loader"
import { loginSchema } from '@/core/lib/validations/login'
import { useState } from 'react'
import { useHandleAuth } from '@/core/hooks/useHandleAuth'

function FormLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const { toggle } = useHandleAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (form: z.infer<typeof loginSchema>) => {
      return signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      })
    },
    onSuccess: () => {
      router.back()
      toggle()
      toast.success("Vous avez bien été connecté")
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la connexion")
    },
  })

 async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)

    const signInResult = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast.error("Une erreur est survenue lors de la connexion")
    }

    router.back()
    toggle()

    return toast.success("Vous avez bien été connecté")

  }

  return (
    <Form {...form}>
      <Title className="text-white" balise="h2">
        Connexion
      </Title>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="sr-only text-white">
                Email de votre compte
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
              <FormLabel className="text-white">Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" autoComplete='on' {...field} />
              </FormControl>
              <FormDescription className="sr-only text-white">
                Mot de passe de votre compte
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant={"default"}
          className="!w-full bg-tertiary"
          type="submit"
        >
          {isLoading ? <Loader /> : "Connexion"}
        </Button>
      </form>

      <Link href="/forget-password">
        <p className="mt-2 block cursor-pointer text-right text-sm">
          Mot de passe oublié ?
        </p>
      </Link>

      <Link href="/register">
        <p className="mt-2 block cursor-pointer text-right text-sm">
          Vous n&apos;avez pas de compte ? Inscrivez-vous
        </p>
      </Link>
    </Form>
  )
}

export default FormLogin
