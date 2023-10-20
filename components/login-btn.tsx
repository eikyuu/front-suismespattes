import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useHandleModal } from '../@core/hooks/useHandleModal';
export default function Component() {
  const { data: session } = useSession();

  const {isOpen, toggle} = useHandleModal();

  return (
    <>
      {session && (
        <Button
          className='text-white bg-primary hover:bg-secondary md:bg-tertiary md:hover:bg-secondary'
          onClick={() => signOut()}
        >
          Déconnexion
        </Button>
      )}
      {!session && (
        <Button
          className='text-white bg-primary hover:bg-secondary md:bg-tertiary md:hover:bg-secondary'
          onClick={toggle}
        >
          Connexion
        </Button>
      )}
    </>
  );
}
