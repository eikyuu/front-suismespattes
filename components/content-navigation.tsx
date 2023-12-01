"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"

import LiNav from "@/components/li-nav"
import LoginBtn from "@/components/login-btn"
import { useRouter } from 'next/navigation'

function ContentNavigation() {
  const { data: session } = useSession()
  const [navbar, setNavbar] = useState(false)

  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside)
    return () => {
      document.removeEventListener("mousedown", clickOutside)
    }
  })

  const handleMenuClick = () => {
    setNavbar(!navbar)
  }

  const clickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setNavbar(false)
    }
  }

  return (
    <header ref={ref}>
      <nav className="border-gray-200 bg-primary">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/">
              <Image
                width={40}
                height={40}
                src="/images/logo.webp"
                alt="logo du site Suis mes pattes"
              />
            </Link>
          </div>
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-4 focus:ring-tertiary"
          >
            <span className="self-center whitespace-nowrap text-2xl font-extrabold tracking-tight text-white">
              Suis mes pattes
            </span>
          </Link>
          <div className="flex lg:order-2">
            <button
              onClick={handleMenuClick}
              data-collapse-toggle="navbar"
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
              aria-controls="navbar"
              aria-expanded="false"
            >
              <span className="sr-only">Menu ouvert</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`w-full items-center justify-between lg:order-1 lg:flex lg:w-auto ${
              navbar ? "" : "hidden"
            }`}
            id="navbar"
          >
            <ul className="mt-4 flex flex-col items-center rounded-lg border border-gray-100 bg-gray-50 p-4 lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:bg-primary lg:p-0">
              <LiNav text="Accueil" href="/" />
              <LiNav text="Destinations" href="/destinations-chien-accepte" />

              <LiNav
                text="Partager une destination"
                href="/partager-une-destination"
                prefetch={false}
                onClick={(e: any) => {
                  if (!session?.user) {
                    e.preventDefault()
                    router.push("/login")
                    return
                  }
                }}
              />
              <LiNav text="Boutique" href="/a-venir" />
              <LiNav text="Contact" href="/contact" />
              <LoginBtn />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default ContentNavigation
