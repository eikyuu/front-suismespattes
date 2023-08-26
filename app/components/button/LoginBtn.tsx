import { useSession, signIn, signOut } from "next-auth/react"
import Button from './Button'
export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <Button text='Déconnexion'  onClick={() => signOut()} />
      </>
    )
  }
  return (
    <>
      <Button text='Connexion' onClick={() => signIn()} />
    </>
  )
}