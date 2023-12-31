"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
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

import { imageSchema } from "../../@core/lib/validations/image"
import { settingsSchema } from "../../@core/lib/validations/settings"
import { getUser, updateUser } from "../../@core/services/authService"
import Loader from "../loader/loader"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Text from "../ui/text/Text"
import { useEffect } from 'react'

function SettingsForm({ user }: { user: any }) {

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      pseudo: "",
      email: "",
    },
  })

  const formUploadImage = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      multipleFiles: undefined,
    },
  })

  const {
    error,
    data,
    isLoading,
  } = useQuery({
    queryKey: ["user", user.id],
    queryFn: async () => await getUser(user.id),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  })

  const mutation = useMutation({
    mutationFn: (form: z.infer<typeof settingsSchema>) => {
      return updateUser(form, user.id)
    },
    onError: () => {
      toast.error(
        "Une erreur est survenue lors de l'inscription veuillez réessayer ou contactez l'administrateur"
      )
    },
  })

  useEffect(() => {
    if (data) {
      form.setValue("pseudo", data?.pseudo)
      form.setValue("email", data?.email)
    }
  }, [data])


  function onSubmit(values: z.infer<typeof settingsSchema>) {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <div className="rounded-2xl p-8 shadow-lg">
        <Title balise="h1">Paramètres</Title>
        <Text type="gray">Gérer les paramètres du compte et du site Web.</Text>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 w-1/2 space-y-4"
        >
          {/* <div className="flex items-center space-x-3">
            <Avatar className="h-40 w-40">
              <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}user/${user.id}/picture`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

             <FormField
              control={formUploadImage.control}
              name="multipleFiles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modifier ou ajouter une image de profil</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      // required={!slug || images.length === 0 ? true : false}
                      accept="image/png, image/jpeg, image/jpg"
                      id="fileInput"
                      onBlur={field.onBlur}
                      name={field.name}
                      onChange={(e) => {
                        field.onChange(e.target.files)
                        //   handleFileChange(e)
                      }}
                      ref={field.ref}
                      className="cursor-pointer"
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Choisir une image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />  
          </div> */}

          <FormField
            control={form.control}
            name="pseudo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre pseudo</FormLabel>
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
                <FormLabel>Votre email</FormLabel>
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

          <Button
            variant={"default"}
            className="mb-1 mt-5 bg-tertiary"
            type="submit"
          >
            {mutation.isPending ? <Loader /> : "Sauvegarder"}
          </Button>
        </form>
      </div>
    </Form>
  )
}

export default SettingsForm
