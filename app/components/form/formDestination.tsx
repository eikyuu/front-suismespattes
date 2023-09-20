'use client';

import Image from 'next/image';
import { useDestinationForm } from '../../../@core/hooks/useDestinationForm';
import GreenContainer from '../GreenContainer';
import Input from '../inputs/Input';
import Label from '../inputs/Label';
import MultiRadio from '../inputs/MultiRadio';
import Textarea from '../inputs/Textarea';
import Loader from '../loader/Loader';
import React, { use, useEffect, useState } from 'react';
import { useFetch } from '../../../@core/hooks/useFetch';
import { API_URL } from '../../../@core/constants/global';
import toast from 'react-hot-toast';
import { TypeCategory } from '../../../@core/enum/TypeCategory';
import Button from '../button/Button';
import { TrashIcon } from '@heroicons/react/24/outline';
import TitleUnderline from '../text/TitleUnderline';


function FormDestination({ slug }: { slug?: string }) {
  const {
    handleSubmit,
    handleChange,
    handleFileChange,
    deleteImage,
    form,
    errors,
    submit,
    images,
    loading,
  } = useDestinationForm(slug);

  // FETCH CATEGORIES
  const { data: categories, error } = useFetch<any>(`${API_URL}category`);
  const [typeCategory, setTypeCategory] = useState<any[]>([]);

  useEffect(() => {

    if (categories) {
      const newTypeCategory = categories.reduce((acc: any[], category: any) => {
        const type = category.type;
        if (!acc.includes(type)) {
          acc.push(type);
        }
        return acc;
      }, []);
      setTypeCategory(newTypeCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const filterCategories = (categories: any, typeCategory: keyof typeof TypeCategory) => {
    return categories.filter((category: any) => category.type === typeCategory);
  }

  if (error) {
    toast.error('Une erreur est survenue lors de la récupération des catégories');
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <GreenContainer>
        <TitleUnderline title='Description' balise='h2' />

        <div className='w-auto md:w-1/2'>
          <Label name='name' label='Nom de la destination' required />
          <Input
            handleChange={handleChange}
            value={form.name}
            errors={errors}
            type='text'
            name='name'
            maxLength={50}
            label='Nom de la destination'
            required
          />
        </div>

        <Label
          name='description'
          label='Description de la destination'
          required
        />
        <Textarea
          maxLength='5000'
          name='description'
          handleChange={handleChange}
          value={form.description}
          describedby='pour la description'
          errors={errors}
        />

        <Label name='category' label='Type de destination' required />
        <select
          value={form.category.id}
          required
          name='category'
          onChange={(e) => handleChange(e)}
          id='categories'
          className='mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5'
        >
          <option value=''>Sélectionnez un type de destination</option>
          {typeCategory && typeCategory.map((type: keyof typeof TypeCategory, index: number) => (
            <optgroup key={index} label={TypeCategory[type]}>
              {categories && filterCategories(categories, type).map((category: any) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </optgroup>
          ))}
        </select>

        <div className=' flex flex-wrap justify-between'>
          <div className='w-full'>
            <Label
              name='waterPoint'
              label='Un point d&#039;eau est il disponible ?'
              required
            />

            <MultiRadio
              handleChange={handleChange}
              form={form}
              options={[
                { label: 'Oui', name: 'waterPoint', value: 'YES' },
                { label: 'Non', name: 'waterPoint', value: 'NO' },
              ]}
            />
          </div>

          <div className='w-full'>
            <Label
              name='processionaryCaterpillarAlert'
              label='Y a t&#039;il une alerte chenille processionnaire ?'
              required
            />
            <MultiRadio
              handleChange={handleChange}
              options={[
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
              form={form}
            />
          </div>

          <div className='w-full'>
            <Label
              name='cyanobacteriaAlert'
              label='Y a t&#039;il une alerte cyanobactérie ?'
              required
            />
            <MultiRadio
              handleChange={handleChange}
              options={[
                { label: 'Oui', name: 'cyanobacteriaAlert', value: 'YES' },
                { label: 'Non', name: 'cyanobacteriaAlert', value: 'NO' },
              ]}
              form={form}
            />
          </div>
        </div>

        <Label
          name='obligatoryLeash'
          label='La laisse est elle obligatoire ?'
          required
        />

        <MultiRadio
          handleChange={handleChange}
          options={[
            { label: 'Oui', name: 'obligatoryLeash', value: 'YES' },
            { label: 'Non', name: 'obligatoryLeash', value: 'NO' },
            {
              label: 'Recommandée',
              name: 'obligatoryLeash',
              value: 'RECOMANDED',
            },
          ]}
          form={form}
        />

        <Label
          name='note'
          label='Quelle note donneriez vous à cette destination ?'
          required
        />
        <MultiRadio
          handleChange={handleChange}
          options={[
            { label: 'Très négatif', name: 'note', value: '0' },
            { label: 'Négatif', name: 'note', value: '1' },
            { label: 'Neutre', name: 'note', value: '2' },
            { label: 'Positif', name: 'note', value: '3' },
            { label: 'Très positif', name: 'note', value: '4' },
          ]}
          form={{ ...form, note: form.note.toString() }}
        />
      </GreenContainer>

      <GreenContainer>
        <TitleUnderline title='Localisation' balise='h2' />

        <div className='w-full md:w-1/2 '>
          <Label name='street' label='N et nom de la rue' required />
          <Input
            handleChange={handleChange}
            value={form.street}
            errors={errors}
            type='text'
            name='street'
            maxLength={50}
            label='N et nom de la rue'
            required
          />
        </div>

        <div className='w-full md:w-1/2 flex flex-col md:flex-row'>
          <div className='md:mr-5'>
            <Label name='postalCode' label='Code postal' required />
            <Input
              handleChange={handleChange}
              value={form.postalCode}
              errors={errors}
              type='text'
              name='postalCode'
              maxLength={5}
              label='Code postal'
              required
            />
          </div>
          <div className=''>
            <Label name='city' label='Ville' required />
            <Input
              handleChange={handleChange}
              value={form.city}
              errors={errors}
              type='text'
              name='city'
              maxLength={50}
              label='Ville'
              required
            />
          </div>
        </div>

        <Label name='country' label='Pays' required />
        <select
          value={form.country}
          required
          name='country'
          onChange={(e) => handleChange(e)}
          id='countries'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5'
        >
          <option value=''>Choissisez un pays</option>
          <option value='US'>United States</option>
          <option value='CA'>Canada</option>
          <option value='FR'>France</option>
          <option value='DE'>Germany</option>
        </select>

        <div className='w-full md:w-1/2 flex flex-col md:flex-row'>
          <div className='md:mr-5'>
            <Label name='latitude' label='Latitude' />
            <Input
              handleChange={handleChange}
              value={form.latitude}
              errors={errors}
              type='number'
              name='latitude'
              label='Latitude'
            />
          </div>
          <div className=''>
            <Label name='longitude' label='Longitude' />
            <Input
              handleChange={handleChange}
              value={form.longitude}
              errors={errors}
              type='number'
              name='longitude'
              label='Longitude'
            />
          </div>
        </div>
      </GreenContainer>

      <GreenContainer>
        <TitleUnderline title='Photos' balise='h2' />

        <p className='block mb-2 mt-5 text-sm font-medium text-white'>
          Vous pouvez ajouter jusqu&apos;à 5 photos.
        </p>
        <p className='block mb-2 mt-5 text-sm font-medium text-white'>
          Les photos doivent être au format PNG, JPEG ou JPG.
        </p>

        <Label
          name='multiple_files'
          label='Ajouter des photos de la destination'
          required
        />
        <input
          onChange={(e) => handleFileChange(e)}
          className='block w-full text-sm text-white
              file:mr-4 file:py-2 file:px-4 file:rounded-lg
              file:border-0 file:text-sm file:font-semibold
              file:bg-white file:text-black
              hover:file:bg-tertiary'
          id='multiple_files'
          type='file'
          accept='image/png, image/jpeg, image/jpg'
          multiple
          required={!slug || images.length === 0 ? true : false}
        />
        {errors && <div className='text-red-400 mt-2'>{errors.images}</div>}

        <div className='flex justify-center items-center flex-col flex-wrap md:flex-row mt-10'>
          {images.map((file: any, index: number) => (
            <React.Fragment key={index}>
              <Image
                key={index}
                className='mt-5 md:mr-5 rounded-lg shadow-lg h-60 w-60 object-cover object-center'
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={300}
                height={300}
              />
              <div
                className='postion relative -top-64 left-28 md:right-0 md:-left-10 md:-top-27  bg-tertiary rounded-full h-10 w-10 flex items-center justify-center text-white hover:bg-tertiary hover:text-black cursor-pointer hover:scale-110 transition ease duration-300 shadow'
                onClick={() => deleteImage(index)}
              >
                <p className='-mt-1 text-xl'>
                <TrashIcon className='w-5 h-5' />
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </GreenContainer>

      <Button
        className='mt-10 !w-24 ' 
        type='submit'
      >
        {submit ? <Loader /> : slug ? 'Modifier' : 'Ajouter'}
      </Button>
    </form>
  );
}

export default FormDestination;
