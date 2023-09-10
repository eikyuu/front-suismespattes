import { useSession, signIn, signOut } from "next-auth/react"
import Button from './Button'
export default function Component() {
  const { data: session } = useSession()

    return ( 
      <>
      {session && <Button className='text-white bg-primary hover:bg-secondary md:bg-quaternary md:hover:bg-secondary' onClick={() => signOut()}>Déconnexion</Button>}
      {!session && <Button className='text-white bg-primary hover:bg-secondary md:bg-quaternary md:hover:bg-secondary'  onClick={() => signIn()}>Connexion</Button>}
      </>

    )
}