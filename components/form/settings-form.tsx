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
import Text from "../ui/text/Text"
import { useEffect, useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { i } from '@tanstack/query-core/build/legacy/queryClient-5b892aba'

function SettingsForm({ user }: { user: any }) {

  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    `${process.env.NEXT_PUBLIC_API_URL}user/${user.id}/picture`
  )

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
    onSuccess: () => {
      toast.success("Paramètres mis à jour avec succès")
      setOpen(false)
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

  function handleFileChange(e: any) {
    formUploadImage.setValue("multipleFiles", e.target.files)
    setImageUrl(URL.createObjectURL(e.target.files[0]))
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
          <div className="flex items-center space-x-3">
            <Avatar className="h-40 w-40">

              <AvatarImage src={imageUrl} />

             {/* <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}user/${user.id}/picture` } /> */}
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
                        handleFileChange(e)
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
          </div>

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

          <AlertDialog open={open} onOpenChange={setOpen}> 
            <AlertDialogTrigger asChild>
              <Button
                variant={"default"}
                className="relative right-0 top-0 block"
              >
                SAUVERGARDER
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Etes-vous sur de vouloir modifier vos informations ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Si vous cliquez sur OK, vos informations seront mis à jour
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  variant={"default"}
                  onClick={form.handleSubmit(onSubmit)}
                >
                 Ok
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </div>
    </Form>
  )
}

export default SettingsForm
