'use client';

import { useState } from 'react';

import toast from 'react-hot-toast';
import { Contact } from '../../../@core/types/Contact';
import GreenContainer from '../../components/GreenContainer';
import Label from '../../components/inputs/Label';
import Input from '../../components/inputs/Input';
import Loader from '../../components/loader/Loader';
import Textarea from '../../components/inputs/Textarea';
import { postMessage } from '../../../@core/services/contactService';
import Button from '../../components/button/Button';
import { useHandleChange } from '../../../@core/hooks/useHandleChange';

export default function Page() {
  const [form, setForm] = useState<any>({
    email: '',
    subject: '',
    message: '',
  });
  const [submit, setSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});

  const { handleChange } = useHandleChange(setForm, setErrors);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmit(true);

    const isValid = validateForm();
    if (!isValid) {
      setSubmit(false);
      return;
    }

    try {
      postMessage(form);
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

  const validateForm = () => {
    let valid = true;
    let errorsTemp = { ...errors };

    const validatorsRules = {
      email: {
        label: 'email',
        minLength: 3,
        maxLength: 50,
      },
      subject: {
        label: 'subject',
        minLength: 3,
        maxLength: 50,
      },
      message: {
        label: 'message',
        minLength: 10,
        maxLength: 1000,
      },
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
    <section className='container mx-auto w-11/12 mt-10'>
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

            <Label name='subject' label='Objet de votre message' required />
            <Input
              handleChange={handleChange}
              value={form.subject}
              errors={errors}
              type='text'
              name='subject'
              maxLength={50}
              label='Objet de votre message'
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
        <Button
          className='mt-10'
          type='submit'
        >
          {submit ? <Loader /> : 'Envoyer'}
        </Button>
      </form>
    </section>
  );
}
