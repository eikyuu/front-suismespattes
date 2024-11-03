"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"

import { siteConfig } from "../core/config/site"
import { cn } from "../core/lib/utils"
import { MainNavItem } from "../core/types"
import { Icons } from "./icons"
import { MobileNav } from "./mobile-nav"
import { useEffect } from "react"
import { useSession } from "next-auth/react"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  useEffect(() => {
    if (showMobileMenu) {
      const handleClick = (e: MouseEvent) => {
        if (e.target instanceof Element && !e.target.closest("#mobile-nav")) {
          setShowMobileMenu(false)
        }
      }
      document.addEventListener("click", handleClick)
      return () => document.removeEventListener("click", handleClick)
    }
  }, [showMobileMenu])

  return (
    <div className="flex gap-6 text-white md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <Image
          width={40}
          height={40}
          src="/images/logo.webp"
          alt="logo du site Suis mes pattes"
        />
        <span className="hidden text-2xl font-extrabold tracking-tight sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 lg:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center transition-colors hover:text-foreground/80",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-white",
                item.disabled && "cursor-not-allowed opacity-80"
              )}

              onClick={(e: any) => {
                // SI LA ROUTE EST UNE ROUTE PRIVÉE ET QUE L'UTILISATEUR N'EST PAS CONNECTÉ
                // ON REDIRIGE VERS LA PAGE DE CONNEXION
              const authStorage = localStorage.getItem('auth-storage');
              const isAuth = authStorage ? JSON.parse(authStorage).state.isAuth : false;
                if (item.private && !isAuth) {
                  e.preventDefault()
                  router.push("/login")
                }
              }}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 lg:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? (
          <Icons.close />
        ) : (
          <Image
            width={40}
            height={40}
            src="/images/logo.webp"
            alt="logo du site Suis mes pattes"
          />
        )}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  )
}
