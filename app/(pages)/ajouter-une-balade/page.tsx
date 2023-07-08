'use client';

import { useState } from 'react';
import Input from '../../../ui/molecules/input/input';
import { WalkForm } from '../../../@core/utils/walkForm';

interface IInputs {
  name: string;
  description: string;
  city: string;
  postalCode: string;
  street: string;
  obligatoryLeash: 'YES' | 'NO' | 'RECOMMENDED';
  waterPoint: boolean;
  processionaryCaterpillarAlert: boolean;
  cyanobacteriaAlert: boolean;
  note: number;
}

export default function Page() {

    const walkForm = new WalkForm();
    
  const [inputs, setInputs] = useState<IInputs>({
    name: '',
    description: '',
    city: '',
    postalCode: '',
    street: '',
    obligatoryLeash: 'YES',
    waterPoint: false,
    processionaryCaterpillarAlert: false,
    cyanobacteriaAlert: false,
    note: 0,
  });

  const [submit, setSubmit] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmit(true);

  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: value,
    }));
  };

  const validators = (
    type: 'name' | 'description',
    minLength: number,
    maxLength: number
  ) => {
    const errors: any = {};

    const label = {
        name: 'nom',
        description: 'description',
    };
    
    switch (true) {
      case inputs[type].length === 0:
        errors[type] = `Le ${label[type]} est obligatoire`;
        break;
      case inputs[type].length < minLength:
        errors[type] = `La ${label[type]} doit contenir au moins 3 caractères`;
        break;
      case inputs[type].length > maxLength:
        errors[type] = `La ${label[type]} doit contenir au maximum 500 caractères`;
        break;
      default:
        break;
    }

    return errors[type];
  };

  return (
    <main className='font-sans'>
      <section className='container'>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <Input
            handleChange={handleChange}
            value={inputs.name}
            error={submit && validators( 'name', 3, 50)}
            type='text'
            name='name'
            placeholder='Nom de la balade'
            label='Nom'
            required
          />

          <Input
            handleChange={handleChange}
            value={inputs.description}
            error={submit && validators('description', 3, 50)}
            type='text'
            name='description'
            placeholder='Description de la balade'
            label='Description'
          />

          <button type='submit'>Ajouter</button>
        </form>
      </section>
    </main>
  );
}
