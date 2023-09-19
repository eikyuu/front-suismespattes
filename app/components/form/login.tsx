import Link from 'next/link';
import Button from '../button/Button';
import Input from '../inputs/Input';
import Label from '../inputs/Label';
import Loader from '../loader/Loader';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

function Login({ redirect }: { redirect?: boolean }) {

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: redirect,
        callbackUrl: '/',
      });

      if (res && res.error) {
        setErrors({ ...errors, email: res.error });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!modal) {
  //     setErrors({ ...errors, email: '', password: '' });
  //     setForm({ ...form, email: '', password: '' });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [modal]);

  return (
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
        errors={errors}
        type='email'
        name='email'
        label='Votre email'
        required
      />
      <Label name='Password' label='Votre mot de passe' required />
      <Input
        handleChange={handleChange}
        value={form.password}
        errors={errors}
        type='password'
        name='password'
        label='Votre mot de passe'
        required
      />
      <Button className='mt-5 mb-1 bg-tertiary !w-full' type='submit'>
        {loading ? <Loader /> : 'Connexion'}
      </Button>
      <Link className='block text-right' href='/forgot-password'>
        Mot de passe oublié ?
      </Link>
    </form>
  );
}

export default Login;
