'use client';

import Input from '../../../ui/molecules/input/input';
import Label from '../../../ui/atoms/label/label';
import Textarea from '../../../ui/atoms/textarea/textarea';
import MultiRadio from '../../../ui/atoms/multiRadio/multiRadio';
import { useWalkForm } from '../../../@core/hooks/useWalkForm';
import Loader from '../../../ui/atoms/loader/Loader';

export default function Page() {
  const { handleSubmit, handleChange, handleFileChange, form, errors, submit } =
    useWalkForm();

  return (
    <main className='font-sans'>
      <section className='container mx-auto w-11/12 '>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className='mt-10'
        >
          <div className='bg-primary h-auto p-10 rounded-lg'>
            <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-32 before:-bottom-1 before:bg-white relative "'>
              Description
            </h2>

            <div className='w-auto md:w-1/2'>
              <Label name='name' label='Nom de la balade' />
              <Input
                handleChange={handleChange}
                value={form.name}
                errors={errors}
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
              value={form.description}
              describedby='pour la description'
              errors={errors}
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
                value={form.street}
                errors={errors}
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
                  value={form.postalCode}
                  errors={errors}
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
                  value={form.city}
                  errors={errors}
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
              onChange={(e) => handleChange(e)}
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

            
            <div className='w-full md:w-1/2 flex flex-col md:flex-row'>
              <div className='md:mr-5'>
                <Label name='latitude' label='Latitude' />
                <Input
                  handleChange={handleChange}
                  value={form.latitude}
                  errors={errors}
                  type='text'
                  name='latitude'
                  placeholder='Latitude'
                  label='Latitude'
                  required
                />
              </div>
              <div className=''>
                <Label name='longitude' label='Longitude' />
                <Input
                  handleChange={handleChange}
                  value={form.longitude}
                  errors={errors}
                  type='text'
                  name='longitude'
                  placeholder='Longitude'
                  label='Longitude'
                  required
                />
              </div>
            </div>


          </div>

          <div className='bg-primary h-auto p-10 mt-10 rounded-lg'>
            <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative'>
              Photos
            </h2>

            <Label
              name='multiple_files'
              label='Ajouter des photos de la balade'
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
              multiple
              required
            />
          </div>

          <button
            className='w-44 mt-10 text-white bg-primary hover:bg-secondary rounded-lg px-5 py-2.5 focus:ring-4 focus:ring-tertiary focus:outline-none'
            type='submit'
          >
            {submit ? <Loader /> : 'Ajouter la balade'}
          </button>
        </form>
      </section>
    </main>
  );
}
