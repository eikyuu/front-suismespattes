import { Fragment } from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Component() {
  const { data: session } = useSession()

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
        <Link href={`/login`}>
          <Button className="bg-primary text-white hover:bg-secondary md:bg-tertiary md:hover:bg-secondary">
            Connexion
          </Button>
        </Link>
      )}
    </Fragment>
  )
}
