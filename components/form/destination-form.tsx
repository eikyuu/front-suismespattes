"use client"

import { Fragment, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Check, ChevronsUpDown, TrashIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useMap } from "react-leaflet"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

import { cn, formatSlug, getUser, userFromSession } from "../../@core/lib/utils"
import { destinationSchema } from "../../@core/lib/validations/destination"
import { imageSchema } from "../../@core/lib/validations/image"
import { fetchCategories } from "../../@core/services/categoryService"
import { fetchCityByCodePostal } from "../../@core/services/cityService"
import {
  deleteDestinationImage,
  fetchAnchorLocation,
  fetchDestinationBySlug,
  postDestination,
  updateDestination,
  uploadImages,
} from "../../@core/services/destinationService"
import { RecenterAutomatically as RecenterAutomaticallyType } from "../../@core/types/recenter-automatically"
import GreenContainer from "../green-container"
import Loader from "../loader/loader"
import LoaderFormDestination from "../loader/loader-form-destination"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import Text from "../ui/text/Text"
import TitleUnderline from "../ui/text/TitleUnderline"
import { useHandleAuth } from '../../@core/hooks/useHandleAuth'

export const LeafletMap = dynamic(
  () => import("@/components/map/leaflet-map"),
  { ssr: false }
)

export const DraggableMarker = dynamic(
  () => import("@/components/map/draggable-marker"),
  { ssr: false }
)

const RecenterAutomatically = ({ lat, lng }: RecenterAutomaticallyType) => {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng])
  return null
}

export function DestinationForm({ slug }: { slug?: string }) {
  const { isAuth, toggle } = useHandleAuth()

  useEffect(() => {
    if (!isAuth) {
      toggle()
    }
  }, [isAuth, toggle])

  const router = useRouter()

  const [images, setImages] = useState<FileList | any>([])

  const formUploadImage = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      multipleFiles: undefined,
    },
  })

  const form = useForm<z.infer<typeof destinationSchema>>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      waterPoint: "NO",
      processionaryCaterpillarAlert: "NO",
      cyanobacteriaAlert: "NO",
      obligatoryLeash: "RECOMANDED",
      note: "0",
      street: "",
      postalCode: "",
      latitude: "",
      longitude: "",
      city: "",
      user: "",
      country: "FR",
    },
  })

  const {
    error: errorDestination,
    data: destination,
    isLoading: isLoadingDestination,
  } = useQuery({
    queryKey: ["destinationBySlug", slug],
    queryFn: async () => await fetchDestinationBySlug(slug as string),
    enabled: !!slug,
  })

  const {
    error: errorCategories,
    data: categories,
    isLoading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await fetchCategories(),
  })

  const {
    error: errorCities,
    data: cities,
    isLoading: isLoadingCities,
  } = useQuery({
    queryKey: ["city", form.watch("postalCode")],
    enabled: form.watch("postalCode").length === 5,
    queryFn: async () => {
      if (form.watch("postalCode").length === 5) {
        return await fetchCityByCodePostal(form.watch("postalCode"))
      }
    },
  })

  const {
    error: errorAnchor,
    data: anchors,
    isLoading: isLoadingAnchor,
    refetch: refetchAnchor,
  } = useQuery({
    queryKey: [
      "anchor",
      form.watch("street"),
      form.watch("postalCode"),
      form.watch("city"),
    ],
    enabled: false,
    queryFn: async () => {
      const formBody = {
        street: form.watch("street"),
        city: form.watch("city"),
        postalCode: form.watch("postalCode"),
      }
      const data = await fetchAnchorLocation(formBody)
      form.setValue("latitude", data.lat.toString())
      form.setValue("longitude", data.lng.toString())
      return data
    },
  })

  useEffect(() => {
    if (destination) {
      form.setValue("name", destination.name)
      form.setValue("description", destination.description)
      form.setValue("category", destination.category.id)
      form.setValue("waterPoint", destination.waterPoint ? "YES" : "NO")
      form.setValue(
        "processionaryCaterpillarAlert",
        destination.processionaryCaterpillarAlert ? "YES" : "NO"
      )
      form.setValue(
        "cyanobacteriaAlert",
        destination.cyanobacteriaAlert ? "YES" : "NO"
      )
      form.setValue("obligatoryLeash", destination.obligatoryLeash)
      form.setValue("note", destination.note.toString())
      form.setValue("street", destination.street)
      form.setValue("postalCode", destination.city.postalCode)
      form.setValue("latitude", destination.latitude)
      form.setValue("longitude", destination.longitude)
      form.setValue("user", destination.user.pseudo)
      form.setValue("country", destination.country)

      fetchImages()
      if (cities) {
        form.setValue("city", destination.city.id)
      }
    }

  }, [destination, cities, form])

  async function fetchImages() {
    const imageFiles: File[] = await Promise.all(
      destination.images.map(async (image: any) => {
        const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}destinations/images/${image.name}`
        return await transformFile(imageUrl)
      })
    )
    setImages(imageFiles)
  }

  async function transformFile(url: string): Promise<File> {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const file = new File([blob], "image.png", { type: "image/png" })
      return file
    } catch (error) {
      console.error("Erreur lors de la récupération de l'image:", error)
      throw error
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      const arr = [...files]
      setImages([...images, ...arr])
    }
  }

  function deleteImage(index: number) {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const { mutate: mutationUpload, isPending: isPendingUpload } = useMutation({
    mutationFn: (formUploadImage: z.infer<typeof imageSchema>) => {
      return uploadImages(formUploadImage, form.getValues("name"))
    },
    onSuccess: () => {
      router.push(
        `/destination-chien-accepte/${formatSlug(form.getValues("name"))}`
      )
      toast.success("Votre destination a bien été ajoutée")
    },
    onError: (error: any) => {
      if (error) {
        toast.error(error.message)
      }
    },
  })

  const {
    mutate,
    isPending,
    error: mutationError,
  } = useMutation({
    mutationFn: (form: z.infer<typeof destinationSchema>) => {
      return postDestination(form)
    },
    onSuccess: () => {
      mutationUpload(images)
    },
    onError: (error: any) => {
      if (error) {
        toast.error(error.message)
      }
    },
  })

  const {
    mutate: update,
    isPending: isPendingUpdate,
    error: updateError,
  } = useMutation({
    mutationFn: (form: z.infer<typeof destinationSchema>) => {
      return updateDestination(form, slug as string)
    },
    onSuccess: () => {
      deleteImageMutation
      mutationUpload(images)
    },
    onError: (error: any) => {
      if (error) {
        toast.error(error.message)
      }
    },
  })

  const { mutate: deleteImageMutation, error: deleteImageMutationError } =
    useMutation({
      mutationFn: (form: z.infer<typeof destinationSchema>) => {
        return deleteDestinationImage(formatSlug(form.name))
      },
      onError: (error: any) => {
        if (error) {
          toast.error(error.message)
        }
      },
    })

  async function onSubmit(values: z.infer<typeof destinationSchema>) {
    const userEmail = await getUser()
    values.user = userEmail || ""

    if (slug) {
      values.user = destination.user.email
      await Promise.all([deleteImageMutation(values), update(values)])
    } else {
      mutate(values)
    }
  }

  if (isLoadingDestination || isLoading) {
    return <LoaderFormDestination />
  }

  if (errorDestination || errorCategories || errorCities || errorAnchor) {
    return toast.error(
      "Une erreur est survenue si cela persiste contactez l'administrateur"
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <GreenContainer className="space-y-6">
          <TitleUnderline title="Description" balise="h2" className="!mt-0" />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Nom de la destination
                </FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} required />
                </FormControl>
                <FormDescription className="sr-only text-white">
                  Nom de la destination
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Description de la destination
                </FormLabel>
                <FormControl>
                  <Textarea {...field} maxLength={5000} required />
                </FormControl>
                <FormDescription className="sr-only text-white">
                  Description de la destination
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white">
                  Categorie de la destination
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between capitalize md:w-[260px]",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category: any) => category.id === field.value
                            )?.name
                          : "Choissisez une categorie"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="max-h-[20rem] w-full overflow-auto p-0 md:w-[260px]">
                    <Command>
                      <CommandInput placeholder="Rechercher une catégorie" />
                      <CommandEmpty>Aucune catégorie trouvé.</CommandEmpty>
                      <CommandGroup>
                        {categories &&
                          categories.map((category: any) => (
                            <CommandItem
                              className="capitalize"
                              value={category.name}
                              key={category.id}
                              onSelect={() => {
                                form.setValue("category", category.id)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category.name === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.name}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription className="sr-only text-white">
                  Categorie de la destination
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="waterPoint"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-white">
                  Un point d&apos;eau est il disponible ?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className="w-full items-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 sm:flex md:w-fit"
                  >
                    <FormItem className="border-b border-gray-200 p-3 sm:border-b-0 sm:border-r">
                      <FormControl>
                        <RadioGroupItem value="YES" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Oui
                      </FormLabel>
                    </FormItem>

                    <FormItem className="p-3">
                      <FormControl>
                        <RadioGroupItem value="NO" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Non
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="processionaryCaterpillarAlert"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-white">
                  Y a t&#039;il une alerte chenille processionnaire ?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className="w-full items-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 sm:flex md:w-fit"
                  >
                    <FormItem className="border-b border-gray-200 p-3 sm:border-b-0 sm:border-r">
                      <FormControl>
                        <RadioGroupItem value="YES" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Oui
                      </FormLabel>
                    </FormItem>

                    <FormItem className="p-3">
                      <FormControl>
                        <RadioGroupItem value="NO" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Non
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cyanobacteriaAlert"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-white">
                  Y a t&#039;il une alerte cyanobactérie ?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className="w-full items-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 sm:flex md:w-fit"
                  >
                    <FormItem className="border-b border-gray-200 p-3 sm:border-b-0 sm:border-r">
                      <FormControl>
                        <RadioGroupItem value="YES" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Oui
                      </FormLabel>
                    </FormItem>

                    <FormItem className="p-3">
                      <FormControl>
                        <RadioGroupItem value="NO" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Non
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="obligatoryLeash"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-white">
                  La laisse est elle obligatoire ?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className="w-full items-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 sm:flex md:w-fit"
                  >
                    <FormItem className="border-b border-gray-200 p-3 sm:border-b-0 sm:border-r">
                      <FormControl>
                        <RadioGroupItem value="YES" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Oui
                      </FormLabel>
                    </FormItem>

                    <FormItem className="border-b border-gray-200 p-3 sm:border-b-0 sm:border-r">
                      <FormControl>
                        <RadioGroupItem value="NO" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Non
                      </FormLabel>
                    </FormItem>

                    <FormItem className="p-3">
                      <FormControl>
                        <RadioGroupItem value="RECOMANDED" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Recommandée
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-white">
                  Quelle note donneriez vous à cette destination ?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className="w-full items-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 sm:flex md:w-fit"
                  >
                    <FormItem className="border-b border-gray-200 p-3 sm:border-b-0 sm:border-r">
                      <FormControl>
                        <RadioGroupItem value="0" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Très négatif
                      </FormLabel>
                    </FormItem>

                    <FormItem className="border-b border-gray-200 p-3 sm:border-b-0 sm:border-r">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Négatif
                      </FormLabel>
                    </FormItem>

                    <FormItem className="border-b border-gray-200 p-3 sm:border-b-0 sm:border-r">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Neutre
                      </FormLabel>
                    </FormItem>

                    <FormItem className="border-b border-gray-200 p-3 sm:border-b-0 sm:border-r">
                      <FormControl>
                        <RadioGroupItem value="3" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Positif
                      </FormLabel>
                    </FormItem>

                    <FormItem className="p-3">
                      <FormControl>
                        <RadioGroupItem value="4" />
                      </FormControl>
                      <FormLabel className="w-full p-3 text-sm font-medium text-gray-900">
                        Très positif
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </GreenContainer>

        <GreenContainer className="space-y-6">
          <TitleUnderline title="Localisation" balise="h2" className="!mt-0" />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Numéro & Nom de rues
                </FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} required />
                </FormControl>
                <FormDescription className="sr-only text-white">
                  Numéro & Nom de rues
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Code postal</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={5} required />
                </FormControl>
                <FormDescription className="sr-only text-white">
                  Code postal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white">Ville</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between capitalize md:w-[260px]",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? cities.find((city: any) => city.id === field.value)
                              ?.label
                          : "Choissisez une ville"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="max-h-[20rem] w-full overflow-auto p-0 md:w-[260px]">
                    <Command>
                      <CommandInput placeholder="Rechercher une ville" />
                      <CommandEmpty>Renseigner un code postal.</CommandEmpty>
                      <CommandGroup>
                        {cities &&
                          cities.map((city: any) => (
                            <CommandItem
                              className="capitalize"
                              value={city.name}
                              key={city.id}
                              onSelect={() => {
                                form.setValue("city", city.id)
                              }}
                            >
                              {city.label}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription className="sr-only text-white">
                  Categorie de la destination
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Text className="my-4 text-white">
            Vérifiez la localisation de votre destination. Repositionnez la
            localisation si besoin.
          </Text>

          <Button
            variant={"outline"}
            className="mt-5 w-full md:mt-0 md:w-[180px]"
            onClick={() => {
              refetchAnchor()
            }}
            type="button"
            disabled={
              !form.watch("street") ||
              !form.watch("postalCode") ||
              !form.watch("city")
            }
          >
            Vérifier la localisation
          </Button>

          <div className="flex h-[600px] w-full flex-col justify-center space-x-0 md:flex-row md:space-x-4">
            <LeafletMap
              center={
                form.watch("latitude") && form.watch("longitude")
                  ? [
                      Number(form.watch("latitude")),
                      Number(form.watch("longitude")),
                    ]
                  : [47.39235495962892, 0.6897129358274583]
              }
              zoom={13}
            >
              <DraggableMarker
                form={form}
                anchor={
                  form.watch("latitude") && form.watch("longitude")
                    ? [
                        Number(form.watch("latitude")),
                        Number(form.watch("longitude")),
                      ]
                    : [47.39235495962892, 0.6897129358274583]
                }
              />

              <RecenterAutomatically
                lat={Number(form.watch("latitude")) || 47.39235495962892}
                lng={Number(form.watch("longitude")) || 0.6897129358274583}
              />
            </LeafletMap>

            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Latitude</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" required />
                  </FormControl>
                  <FormDescription className="sr-only text-white">
                    Latitude
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Longitude</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" required />
                  </FormControl>
                  <FormDescription className="sr-only text-white">
                    Longitude
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </GreenContainer>

        <GreenContainer className="space-y-6">
          <TitleUnderline title="Photos" balise="h2" className="!mt-0" />
          <Text className="text-white">
            Les photos doivent être au format PNG, JPEG ou JPG et ne doivent pas
            dépasser 5 Mo.
          </Text>

          <FormField
            control={formUploadImage.control}
            name="multipleFiles"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Ajouter des photos de la destination
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    required={!slug || images.length === 0 ? true : false}
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
                <FormDescription className="sr-only text-white">
                  Ajouter des photos de la destination
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {images.length >= 1 && (
            <div className="mt-10 flex flex-col flex-wrap items-center justify-center md:flex-row">
              {images.map((file: any, index: number) => (
                <Fragment key={index}>
                  <Image
                    key={index}
                    className="mt-5 h-60 w-60 rounded-md object-cover object-center shadow-lg md:mr-5"
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={300}
                    height={300}
                  />
                  <div
                    className="postion ease relative -top-64 left-28 flex h-10  w-10 cursor-pointer items-center justify-center rounded-full bg-tertiary text-white shadow transition duration-300 hover:scale-110 hover:bg-tertiary hover:text-black md:-left-10 md:-top-27 md:right-0"
                    onClick={() => deleteImage(index)}
                  >
                    <p className="-mt-1 text-xl">
                      <TrashIcon className="h-5 w-5" />
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          )}
        </GreenContainer>

        <Button variant={"default"} type="submit">
          {isPending || isPendingUpdate || isPendingUpload ? (
            <Loader />
          ) : (
            "Envoyer"
          )}
        </Button>
      </form>
    </Form>
  )
}
