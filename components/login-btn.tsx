import { Fragment } from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function  Component() {
  const { data: session } = useSession()

  const router = useRouter()

  return (
    <Fragment>
      {session && (
        <Button
          className="bg-primary text-white hover:bg-secondary md:bg-tertiary md:hover:bg-secondary"
          onClick={() => signOut()}
        >
          Déconnexion
        </Button>
      )}
      {!session && (
          <Button className="bg-primary text-white hover:bg-secondary md:bg-tertiary md:hover:bg-secondary" onClick={() => router.push('/login')}>
            Connexion
          </Button>
      )}
    </Fragment>
  )
}
