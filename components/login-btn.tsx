"use client"

import { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

import { buttonVariants } from "@/components/ui/button"

import { useHandleAuth } from "../@core/hooks/useHandleAuth"
import { cn } from "../@core/lib/utils"
import { UserAccountNav } from "./user-account-nav"

export default function LoginBtn() {
  const [userSession, setUserSession] = useState<any>(null)
  const { isAuth, toggle } = useHandleAuth()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      setUserSession(session?.user)
    }
  }, [session])

  return (
    <Fragment>
      {isAuth && userSession && (
        <UserAccountNav
          user={{
            name: userSession.pseudo,
            // image: "user.image",
            email: userSession.email,
          }}
        />
      )}

      {!isAuth && (
        <Link
          onClick={(e) => {
            if (session) {
              e.preventDefault()
              toggle()
              return
            }
          }}
          href="/login"
          className={cn(
            buttonVariants({ variant: "tertiary", size: "sm" }),
            "px-4 text-white hover:bg-secondary md:bg-tertiary md:hover:bg-secondary"
          )}
        >
          CONNEXION
        </Link>
      )}
    </Fragment>
  )
}
