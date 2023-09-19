import { useSession, signIn, signOut } from 'next-auth/react';
import Button from './Button';
import { use, useEffect, useState } from 'react';
import MediumTitle from '../text/MediumTitle';
import Label from '../inputs/Label';
import Input from '../inputs/Input';
import Link from 'next/link';
import Modal from '../Modal';
import Loader from '../loader/Loader';
export default function Component() {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
  
      if (res && res.error) {
        setErrors('Email ou mot de passe incorrect');
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!modal) {
      setErrors(null);
      setForm({ ...form, email: '', password: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

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
        <MediumTitle color='white' title='Connexion' />
          <form
            className=''
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Label name='email' label='Votre email' required />
            <Input
              handleChange={handleChange}
              value={form.email}
              type='email'
              name='email'
              label='Votre email'
              required
            />
            <Label name='Password' label='Votre mot de passe' required />
            <Input
              handleChange={handleChange}
              value={form.password}
              type='password'
              name='password'
              label='Votre mot de passe'
              required
            />

            {errors && <div className='text-red-400 mt-2'>{errors}</div>}

            <Button className='mt-5 mb-1 bg-tertiary !w-full' type='submit'>
              {loading ? <Loader /> : 'Connexion'}
            </Button>
            <Link className='block text-right mt-2' href='/forgot-password'>
              Mot de passe oublié ?
            </Link>
          </form>
      </Modal>
      }
    </>
  );
}
