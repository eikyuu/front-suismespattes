'use client';

import Image from 'next/image';
import { useDestinationForm } from '../../../@core/hooks/useDestinationForm';
import GreenContainer from '../GreenContainer';
import Input from '../inputs/Input';
import Label from '../inputs/Label';
import MultiRadio from '../inputs/MultiRadio';
import Textarea from '../inputs/Textarea';
import Loader from '../loader/Loader';
import BlurImage from '../blurImage/BlurImage';

function FormDestination({slug}: {slug?: string}) {
    const { handleSubmit, handleChange, handleFileChange, form, errors, submit, files } =
    useDestinationForm(slug);
    return (
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <GreenContainer>
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-32 before:-bottom-1 before:bg-white relative'>
            Description
          </h2>

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
            maxLength='1000'
            name='description'
            handleChange={handleChange}
            value={form.description}
            describedby='pour la description'
            errors={errors}
          />

          <div className=' flex flex-wrap justify-between'>
            <div className='w-full'>
              <Label
                name='waterPoint'
                label='Un point d&#039;eau est il disponible ?'
                required
              />
              <MultiRadio
                handleChange={handleChange}
                radios={[
                  { label: 'Oui', name: 'waterPoint', value: 'YES' },
                  { label: 'Non', name: 'waterPoint', value: 'NO' },
                ]}
                value={form.waterPoint ? 'YES' : 'NO'}
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
                value={form.processionaryCaterpillarAlert ? 'YES' : 'NO'}
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
                radios={[
                  { label: 'Oui', name: 'cyanobacteriaAlert', value: 'YES' },
                  { label: 'Non', name: 'cyanobacteriaAlert', value: 'NO' },
                ]}
                value={form.cyanobacteriaAlert ? 'YES' : 'NO'}
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
            radios={[
              { label: 'Oui', name: 'obligatoryLeash', value: 'YES' },
              { label: 'Non', name: 'obligatoryLeash', value: 'NO' },
              {
                label: 'Recommandée',
                name: 'obligatoryLeash',
                value: 'RECOMANDED',
              },
            ]}
            value={form.obligatoryLeash}
          />

          <Label
            name='note'
            label='Quelle note donneriez vous à cette destination ?'
            required
          />
          <MultiRadio
            handleChange={handleChange}
            radios={[
              { label: 'Très négatif', name: 'note', value: '0' },
              { label: 'Négatif', name: 'note', value: '1' },
              { label: 'Neutre', name: 'note', value: '2' },
              { label: 'Positif', name: 'note', value: '3' },
              { label: 'Très positif', name: 'note', value: '4' },
            ]}
            value={form.note.toString()}
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
          <h2 className='text-4xl font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative'>
            Photos
          </h2>

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
            required
          />
          {errors && <div className='text-red-400 mt-2'>{errors.images}</div>}

          {/* {files.map((file: any, index: number) => (
            <Image
              key={index}
              src={URL.createObjectURL(file)}
              alt={file.name}
              width={200}
              height={300}
            />
          ))}

          {form.images &&
            form.images.map((image: any, index: number) => (
              <Image
                key={index}
                src={`${process.env.NEXT_PUBLIC_API_URL}destination/images/${image.name}`}
                alt={image.name}
                width={200}
                height={300}
              />
            ))} */}
        </GreenContainer>

        <button
          className='w-44 mt-10 text-white bg-primary hover:bg-secondary rounded-lg px-5 py-2.5 focus:ring-4 focus:ring-tertiary focus:outline-none'
          type='submit'
        >
          {submit ? <Loader /> : 'Ajouter'}
        </button>
      </form>
    );
}

export default FormDestination;