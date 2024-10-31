'use client'

import Link from "next/link"
import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../@core/services/authService'

export function UserAccountNav({ userId }: { userId: any }) {

  const { error, data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getUser(userId),
  })

  if (isLoading) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          userId={user?.id}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user && <p className="font-medium">{user.pseudo}</p>}
            {user && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/mes-destinations">Mes destinations</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Paramètres</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({ callbackUrl: "/" })
            //clear the local storage
            localStorage.clear()
          }}
        >
          Se deconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
