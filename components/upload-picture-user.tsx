"use client"

import React from "react"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function UploadPictureUser({
  id,
  formUploadImage,
  setImageUrl,
  imageUrl,
}: {
  id: string
  formUploadImage: any
  setImageUrl: any
  imageUrl: string
}) {
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    formUploadImage.setValue("multipleFiles", e.target.files)
    if (e.target.files) {
      setImageUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <div className="flex-col items-center md:flex-row">
      <Avatar className="h-40 w-40">
        <AvatarImage src={imageUrl} />
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
  )
}
