import { useSession, signIn, signOut } from 'next-auth/react';
import Button from './Button';
import { useEffect, useState } from 'react';
import Label from '../inputs/Label';
import Input from '../inputs/Input';
import Link from 'next/link';
import Modal from '../Modal';
import Loader from '../loader/Loader';
import Title from '../text/Title';
import Login from '../form/login';
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
