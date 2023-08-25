'use client';

import { useState } from 'react';
import GreenContainer from '../../../composants/greenContainer';
import Label from '../../../composants/inputs/label';
import Textarea from '../../../composants/inputs/textarea';
import Input from '../../../composants/inputs/input';
import Loader from '../../../composants/loader/loader';
import { API_URL } from '../../../@core/constants/global';
import toast from 'react-hot-toast';
import { Contact } from '../../../@core/types/Contact';

export default function Page() {
  const [form, setForm] = useState<any>({
    email: '',
    password: '',
  });
  const [submit, setSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmit(true);

    const isValid = validateForm();
    if (!isValid) {
      setSubmit(false);
      return;
    }

    try {
    const response =  await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      //set the token in local storage
      const data = await response.json();
      localStorage.setItem('token', data.token);

      toast.success('Connexion réussie');

    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue lors de la connexion');
    } finally {
      setSubmit(false);
      setForm({
        email: '',
        password: '',
      })
      setErrors({});
    }

  };

  const validateForm = () => {
    let valid = true;
    let errorsTemp = { ...errors };

    const validatorsRules = {
      email: {
        label: 'email',
        minLength: 3,
        maxLength: 50,
      },
      password: {
        label: 'mot de passe',
        minLength: 3,
        maxLength: 50,
      }
    };

    Object.keys(validatorsRules).forEach((key) => {
      const { label, minLength, maxLength } = validatorsRules[key as keyof typeof validatorsRules];
      switch (true) {
        case form[key as keyof Contact].length === 0:
          errorsTemp = { ...errorsTemp, [key]: `Le ${label} est obligatoire` };
          valid = false;
          break;
        case form[key as keyof Contact].length < minLength:
          errorsTemp = { ...errorsTemp, [key]: `Le ${label} doit contenir au minimum ${minLength} caractères` };
          valid = false;
          break;
        case form[key as keyof Contact].length > maxLength:
          errorsTemp = { ...errorsTemp, [key]: `Le ${label} doit contenir au maximum ${maxLength} caractères` };
          valid = false;
          break;
        default:
          break;
      }
    });

    setErrors(errorsTemp);

    return valid;

  };

  return (
    <main className='font-sans container mx-auto w-11/12 mt-10'>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <GreenContainer>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-32 before:-bottom-1 before:bg-white relative '>
            Connexion
          </h2>

          <div className='w-auto md:w-1/2 mx-auto'>
            <Label name='email' label='Votre email' required />
            <Input
              handleChange={handleChange}
              value={form.email}
              errors={errors}
              type='email'
              name='email'
              maxLength={50}
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
              maxLength={50}
              label='Votre mot de passe'
              required
            />

          </div>
        </GreenContainer>
        <button
          className='w-44 mt-10 text-white bg-primary hover:bg-secondary rounded-lg px-5 py-2.5 focus:ring-4 focus:ring-tertiary focus:outline-none'
          type='submit'
        >
          {submit ? <Loader /> : 'Connexion'}
        </button>
      </form>
    </main>
  );
}
