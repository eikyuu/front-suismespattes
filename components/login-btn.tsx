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
  const { toggle } = useHandleAuth()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      setUserSession(session?.user)
    }
  }, [session])

  const [isAuth, setIsAuthenticated] = useState(false)

  // Fonction pour vérifier l'authentification dans le local storage
  const checkAuthStatus = () => {
    const authStorage = localStorage.getItem('auth-storage')
    const isAuthenticated = authStorage ? JSON.parse(authStorage).state.isAuth : false
    setIsAuthenticated(isAuthenticated)
  }

  useEffect(() => {
    // Initial check
    checkAuthStatus()

    // Vérification périodique de l'état d'authentification toutes les secondes
    const intervalId = setInterval(checkAuthStatus, 1000)

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Fragment>
      {!isAuth ? (
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
      ) : (
        <UserAccountNav
          userId={session?.user?.id}
        />
      )}
    </Fragment>
  )
}
