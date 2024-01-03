'use client'

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Icons } from "./icons"

export function UserAvatar({ user, ...props }: any) {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://via.placeholder.com/150"
  )

  async function fetchImage(url: string) {
    try {
      const res = await fetch(url);
      if (res.status === 400) {
        setImageUrl("https://via.placeholder.com/150");
      } else {
        setImageUrl(url);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  useEffect(() => {
    if (user.image) {
      fetchImage(user.image)
    }
  }, [user.image])

  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={imageUrl} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
