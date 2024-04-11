'use client'

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Icons } from "./icons"
import { n } from '@tanstack/query-core/build/legacy/queryClient-5b892aba'

export function UserAvatar({ userId, ...props }: any) {

  return (
    <Avatar {...props}>

        <AvatarImage alt="Picture" src={`${process.env.NEXT_PUBLIC_API_URL}users/${userId}/picture`} />

      <AvatarFallback>NO</AvatarFallback>

    </Avatar>
  )
}
