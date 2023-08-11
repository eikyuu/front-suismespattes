'use client';

import { useState } from 'react';
import Input from '../../../ui/molecules/input/input';
import Label from '../../../ui/atoms/label/label';
import Textarea from '../../../ui/atoms/textarea/textarea';
import MultiRadio from '../../../ui/atoms/multiRadio/multiRadio';
import { IInputs } from '../../../@core/interfaces/IInput';
import { API_URL } from '../../../@core/constants/global';
import { formatSlug } from '../../../@core/utils/utils';

export default function Page() {
  //const walkForm = new WalkForm();

  const [inputs, setInputs] = useState<IInputs>({
    name: '',
    description: '',
    city: '',
    postalCode: '',
    street: '',
    country: '',
    obligatoryLeash: 'YES',
    waterPoint: false,
    processionaryCaterpillarAlert: false,
    cyanobacteriaAlert: false,
    note: 0,
    files: [],
  });

  const [submit, setSubmit] = useState<boolean>(false);

  const uploadFile = async () => {

    const formData = new FormData();
    formData.append('image', inputs.files[0]);
    formData.append('slug', formatSlug(inputs.name));

    try {
    const response = await fetch(`${API_URL}walks/images`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log('error');
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmit(true);

    fetch(`${API_URL}walks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        uploadFile();
        setSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
      });
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setInputs((inputs: any) => ({
        ...inputs,
        [name]: [...inputs.files, file],
      }));
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (
      name === 'waterPoint' ||
      name === 'processionaryCaterpillarAlert' ||
      name === 'cyanobacteriaAlert'
    ) {
      setInputs((inputs: any) => ({
        ...inputs,
        waterPoint: value === 'YES',
      }));
      return;
    }

    setInputs((inputs: any) => ({
      ...inputs,
      [name]: value,
    }));
  };

  const validators = (
    type:
      | 'name'
      | 'description'
      | 'city'
      | 'country'
      | 'postalCode'
      | 'street'
      | 'obligatoryLeash',
    minLength: number,
    maxLength: number
  ) => {
    const errors: any = {};

    const label = {
      name: 'nom',
      description: 'description',
      city: 'ville',
      postalCode: 'code postal',
      street: 'rue',
      country: 'pays',
      obligatoryLeash: 'laisse obligatoire',
      waterPoint: "point d'eau",
      processionaryCaterpillarAlert: 'alerte chenille processionnaire',
      cyanobacteriaAlert: 'alerte cyanobactérie',
      note: 'note',
    };

    switch (true) {
      case inputs[type].length === 0:
        errors[type] = `Le ${label[type]} est obligatoire`;
        break;
      case inputs[type].length < minLength:
        errors[type] = `La ${label[type]} doit contenir au moins 3 caractères`;
        break;
      case inputs[type].length > maxLength:
        errors[
          type
        ] = `La ${label[type]} doit contenir au maximum 500 caractères`;
        break;
      default:
        break;
    }

    return errors[type];
  };

  return (
    <main className='font-sans'>
      <section className='container mx-auto w-11/12 '>
        <form onSubmit={handleSubmit} className='mt-10'>
          <div className='bg-primary h-auto p-10 rounded-lg'>
            <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-32 before:-bottom-1 before:bg-white relative "'>
              Description
            </h2>

            <div className='w-auto md:w-1/2'>
              <Label name='name' label='Nom de la balade' />
              <Input
                handleChange={handleChange}
                value={inputs.name}
                error={submit && validators('name', 3, 50)}
                type='text'
                name='name'
                placeholder='Nom de la balade'
                label='Nom de la balade'
                required
              />
            </div>

            <Label name='description' label='Description de la balade' />
            <Textarea
              placeholder='Description de la balade'
              name='description'
              handleChange={handleChange}
              value={inputs.description}
              describedby='pour la description'
            />

            <div className=' flex flex-wrap justify-between'>
              <div className='w-full'>
                <p className='text-sm mb-2 mt-5 font-medium text-white'>
                  Un point d&#039;eau est il disponible ?
                </p>

                <MultiRadio
                  handleChange={handleChange}
                  radios={[
                    { label: 'Oui', name: 'waterPoint', value: 'YES' },
                    { label: 'Non', name: 'waterPoint', value: 'NO' },
                  ]}
                />
              </div>

              <div className='w-full'>
                <p className='text-sm mb-2 mt-5 font-medium text-white'>
                  Y a t&#039;il une alerte chenille processionnaire ?
                </p>

                <MultiRadio
                  handleChange={handleChange}
                  radios={[
                    {
                      label: 'Oui',
                      name: 'processionaryCaterpillarAlert',
                      value: 'YES',
                    },
                    {
                      label: 'Non',
                      name: 'processionaryCaterpillarAlert',
                      value: 'NO',
                    },
                  ]}
                />
              </div>

              <div className='w-full'>
                <p className='text-sm mb-2 mt-5 font-medium text-white'>
                  Y a t&#039;il une alerte cyanobactérie ?
                </p>

                <MultiRadio
                  handleChange={handleChange}
                  radios={[
                    { label: 'Oui', name: 'cyanobacteriaAlert', value: 'YES' },
                    { label: 'Non', name: 'cyanobacteriaAlert', value: 'NO' },
                  ]}
                />
              </div>
            </div>

            <p className='text-sm mb-2 mt-5 font-medium text-white'>
              La laisse est elle obligatoire ?
            </p>

            <MultiRadio
              handleChange={handleChange}
              radios={[
                { label: 'Oui', name: 'obligatoryLeash', value: 'YES' },
                { label: 'Non', name: 'obligatoryLeash', value: 'NO' },
                {
                  label: 'Recommandée',
                  name: 'obligatoryLeash',
                  value: 'RECOMANDED',
                },
              ]}
            />

            <p className='text-sm mb-2 mt-5 font-medium text-white'>
              Quelle note donneriez vous à cette balade ?
            </p>

            <MultiRadio
              handleChange={handleChange}
              radios={[
                { label: 'Très négatif', name: 'note', value: '1' },
                { label: 'Négatif', name: 'note', value: '2' },
                { label: 'Neutre', name: 'note', value: '3' },
                { label: 'Positif', name: 'note', value: '4' },
                { label: 'Très positif', name: 'note', value: '5' },
              ]}
            />
          </div>
          <div className='bg-primary h-auto p-10 mt-10 rounded-lg'>
            <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-32 before:-bottom-1 before:bg-white relative'>
              Localisation
            </h2>

            <div className='w-full md:w-1/2 '>
              <Label name='street' label='N et nom de la rue' />
              <Input
                handleChange={handleChange}
                value={inputs.street}
                error={submit && validators('street', 3, 50)}
                type='text'
                name='street'
                placeholder='N et nom de la rue'
                label='N et nom de la rue'
                required
              />
            </div>

            <div className='w-full md:w-1/2 flex flex-col md:flex-row'>
              <div className='md:mr-5'>
                <Label name='postalCode' label='Code postal' />
                <Input
                  handleChange={handleChange}
                  value={inputs.postalCode}
                  error={submit && validators('postalCode', 3, 50)}
                  type='text'
                  name='postalCode'
                  placeholder='Code postal'
                  label='Code postal'
                  required
                />
              </div>
              <div className=''>
                <Label name='city' label='Ville' />
                <Input
                  handleChange={handleChange}
                  value={inputs.city}
                  error={submit && validators('city', 3, 50)}
                  type='text'
                  name='city'
                  placeholder='Ville'
                  label='Ville'
                  required
                />
              </div>
            </div>

            <Label name='country' label='Pays' />
            <select
              name='country'
              onChange={handleChange}
              defaultValue={'default'}
              id='countries'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5'
            >
              <option value='default'>Choissisez un pays</option>
              <option value='US'>United States</option>
              <option value='CA'>Canada</option>
              <option value='FR'>France</option>
              <option value='DE'>Germany</option>
            </select>
          </div>

          <label
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            htmlFor='multiple_files'
          >
            Upload multiple files
          </label>
          <input
            onChange={handleFileChange}
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            id='multiple_files'
            type='file'
            multiple
          />

          <button
            className='w-max mt-10 text-white bg-primary hover:bg-secondary rounded-lg px-5 py-2.5 focus:ring-4 focus:ring-tertiary focus:outline-none'
            type='submit'
          >
            Ajouter
          </button>
        </form>
      </section>
    </main>
  );
}
