import { useSession, signOut } from 'next-auth/react';
import Button from './Button';
import { useState } from 'react';
import Modal from '../Modal';
import Login from '../form/auth/Login';
export default function Component() {
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);

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
          onClick={() => {
            setModal(true);
          }}
        >
          Connexion
        </Button>
      )}

      {modal && <Modal setModal={setModal}>
          <Login />
      </Modal>
      }
    </>
  );
}
