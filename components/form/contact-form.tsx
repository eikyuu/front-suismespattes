"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

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

import { postMessage } from "../../core/services/contactService"
import Loader from "../loader/loader"
import { Textarea } from "../ui/textarea"
import { contactSchema } from '../../core/lib/validations/contact'

export function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (form: z.infer<typeof contactSchema>) => {
      return postMessage(form)
    },
    onSuccess: () => {
      form.reset()
      toast.success("Votre message a bien été envoyé")
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'envoi du message")
    },
  })

  function onSubmit(values: z.infer<typeof contactSchema>) {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                Email de contact pour vous répondre
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Objet</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="sr-only text-white">
                Objet de votre message
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Message</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormDescription className="sr-only text-white">
                Objet de votre message
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"tertiary"} type="submit">
          {mutation.isPending ? <Loader /> : "Envoyer"}
        </Button>
      </form>
    </Form>
  )
}
