import { useSession, signIn, signOut } from "next-auth/react"
import Button from './Button'
export default function Component() {
  const { data: session } = useSession()

    return ( 
      <>
      {session && <Button text='Déconnexion'  onClick={() => signOut()} />}
      {!session && <Button text='Connexion'  onClick={() => signIn()} />}
      </>

    )
}