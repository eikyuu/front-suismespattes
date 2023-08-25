'use client';

import { useState } from 'react';
import GreenContainer from '../../../composants/greenContainer';
import Label from '../../../composants/inputs/label';
import Textarea from '../../../composants/inputs/textarea';
import Input from '../../../composants/inputs/input';
import Loader from '../../../composants/loader/loader';
import { API_URL } from '../../../@core/constants/global';
import toast from 'react-hot-toast';

export default function Page() {
  const [form, setForm] = useState<any>({
    email: '',
    subject: '',
    message: '',
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
    console.log(form);
    setSubmit(true);

    try {
    const response =  await fetch(`${API_URL}contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      toast.success('Votre message a bien été envoyé');

    } catch (error) {
      console.error(error);
      toast.error('Une erreur est survenue lors de l\'envoi du message');
    } finally {
      setSubmit(false);
      setForm({
        email: '',
        subject: '',
        message: '',
      })
      setErrors({});
    }

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
            Contact
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

            <Label name='subject' label='Object de votre message' required />
            <Input
              handleChange={handleChange}
              value={form.subject}
              errors={errors}
              type='text'
              name='subject'
              maxLength={50}
              label='Object de votre message'
              required
            />

            <Label name='message' label='Votre message' required />
            <Textarea
              maxLength='1000'
              name='message'
              handleChange={handleChange}
              value={form.message}
              describedby='pour votre message'
              errors={errors}
            />
          </div>
        </GreenContainer>
        <button
          className='w-44 mt-10 text-white bg-primary hover:bg-secondary rounded-lg px-5 py-2.5 focus:ring-4 focus:ring-tertiary focus:outline-none'
          type='submit'
        >
          {submit ? <Loader /> : 'Envoyer'}
        </button>
      </form>
    </main>
  );
}
