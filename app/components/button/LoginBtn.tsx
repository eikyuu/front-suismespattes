import { useSession, signIn, signOut } from "next-auth/react"
import Button from './Button'
export default function Component() {
  const { data: session } = useSession()

    return ( 
      <>
      {session && <Button text='Déconnexion' className='text-white bg-primary hover:bg-secondary md:bg-secondary md:hover:bg-primary' onClick={() => signOut()} />}
      {!session && <Button text='Connexion' className='text-white bg-primary hover:bg-secondary md:bg-secondary md:hover:bg-primary'  onClick={() => signIn()} />}
      </>

    )
}