'use client';

import Input from '../../../composants/inputs/input';
import Label from '../../../composants/inputs/label';
import Textarea from '../../../composants/inputs/textarea';
import MultiRadio from '../../../composants/inputs/multiRadio';
import { useWalkForm } from '../../../@core/hooks/useWalkForm';
import Loader from '../../../composants/loader/loader';
import GreenContainer from '../../../composants/greenContainer';

export default function Page() {
  const { handleSubmit, handleChange, handleFileChange, form, errors, submit } =
    useWalkForm();

  return (
    <main className='font-sans container mx-auto w-11/12 mt-10'>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <GreenContainer>
            <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-32 before:-bottom-1 before:bg-white relative "'>
              Description
            </h2>

            <div className='w-auto md:w-1/2'>
              <Label name='name' label='Nom de la balade' required/>
              <Input
                handleChange={handleChange}
                value={form.name}
                errors={errors}
                type='text'
                name='name'
                maxLength={50}                
                label='Nom de la balade'
                required
              />
            </div>

            <Label name='description' label='Description de la balade' required />
            <Textarea
              maxLength='1000'
              name='description'
              handleChange={handleChange}
              value={form.description}
              describedby='pour la description'
              errors={errors}
            />

            <div className=' flex flex-wrap justify-between'>
              <div className='w-full'>
                <Label name='waterPoint' label='Un point d&#039;eau est il disponible ?' required />
                <MultiRadio
                  handleChange={handleChange}
                  radios={[
                    { label: 'Oui', name: 'waterPoint', value: 'YES' },
                    { label: 'Non', name: 'waterPoint', value: 'NO' },
                  ]}
                />
              </div>

              <div className='w-full'>
                <Label name='processionaryCaterpillarAlert' label='Y a t&#039;il une alerte chenille processionnaire ?' required />
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
                <Label name='cyanobacteriaAlert' label='Y a t&#039;il une alerte cyanobactérie ?' required />
                <MultiRadio
                  handleChange={handleChange}
                  radios={[
                    { label: 'Oui', name: 'cyanobacteriaAlert', value: 'YES' },
                    { label: 'Non', name: 'cyanobacteriaAlert', value: 'NO' },
                  ]}
                />
              </div>
            </div>

            <Label name='obligatoryLeash' label='La laisse est elle obligatoire ?' required />

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

            <Label name='note' label='Quelle note donneriez vous à cette balade ?' required />
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
          </GreenContainer>

          <GreenContainer>
            <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-32 before:-bottom-1 before:bg-white relative'>
              Localisation
            </h2>

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
                  maxLength={5}                  label='Code postal'
                  required
                />
              </div>
              <div className=''>
                <Label name='city' label='Ville' required/>
                <Input
                  handleChange={handleChange}
                  value={form.city}
                  errors={errors}
                  type='text'
                  name='city'
                  maxLength={50}                  label='Ville'
                  required
                />
              </div>
            </div>

            <Label name='country' label='Pays' required/>
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
                  label='Latitude'
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
                  label='Longitude'
                />
              </div>
            </div>
          </GreenContainer>

          <GreenContainer>
            <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative'>
              Photos
            </h2>

            <Label
              name='multiple_files'
              label='Ajouter des photos de la balade'
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
              multiple
              required
            />
          </GreenContainer>

          <button
            className='w-44 mt-10 text-white bg-primary hover:bg-secondary rounded-lg px-5 py-2.5 focus:ring-4 focus:ring-tertiary focus:outline-none'
            type='submit'
          >
            {submit ? <Loader /> : 'Ajouter la balade'}
          </button>
        </form>
    </main>
  );
}
