import Link from 'next/link';
import Button from '../button/Button';
import Input from '../inputs/Input';
import Label from '../inputs/Label';
import Loader from '../loader/Loader';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Title from '../text/Title';

function Login({ redirect }: { redirect?: boolean }) {

  const [loading, setLoading] = useState(false);
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


  return (
    <>
    <Title className='text-white' title='Connexion' balise='h2' />
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
      <Link prefetch={false} className='block text-right mt-2' href='/forgot-password'>
        Mot de passe oublié ?
      </Link>
    </form>
    </>
  );
}

export default Login;
