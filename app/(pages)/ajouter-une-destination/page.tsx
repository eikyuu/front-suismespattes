'use client';

import { useWalkForm } from '../../../@core/hooks/useWalkForm';
import GreenContainer from '../../components/GreenContainer';
import Input from '../../components/inputs/Input';
import Label from '../../components/inputs/Label';
import MultiRadio from '../../components/inputs/MultiRadio';
import Textarea from '../../components/inputs/Textarea';
import Loader from '../../components/loader/Loader';
import LargeTitle from '../../components/text/LargeTitle';

export default function Page() {
  const { handleSubmit, handleChange, handleFileChange, form, errors, submit } =
    useWalkForm();

  return (
    <main className='container mx-auto w-11/12'>
      <section className='mt-10'>
        <LargeTitle title='AJOUTER UN LIEU TESTÉ AVEC MON CHIEN' />
        <p className='mt-10'>
          <b>Les moments partagés avec nos fidèles compagnons à quatre pattes sont
          parmi les plus précieux de nos vies.</b> Chaque sortie devient une
          aventure, chaque promenade un voyage au royaume de la nature, de la
          découverte et du plaisir. Si vous avez eu la chance de découvrir un
          lieu de sortie extraordinaire en compagnie de votre chien, alors vous
          détenez un trésor d&apos;expériences à partager avec le monde.
        </p>
        <p className='mt-10'>
        &#128021; &#x26FA; &#x2705; En partageant vos expériences de sortie avec votre chien, vous offrez
          bien plus qu&apos;une simple recommandation. Vous partagez des
          sourires, des souvenirs et des émotions. Vous invitez les autres à
          découvrir la magie de ces moments simples, mais profondément
          enrichissants. Vos photos pourraient capturer le regard curieux de
          votre chien scrutant un ruisseau pour la première fois, ou son
          excitation palpable en explorant un nouveau sentier. Vos mots
          pourraient inspirer un autre propriétaire de chien à sortir et à
          explorer le monde avec son meilleur ami.
        </p>
      </section>
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

          <Label name='description' label='Description de la destination' required />
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
          />

          <Label
            name='note'
            label='Quelle note donneriez vous à cette destination ?'
            required
          />
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
          {errors && <div className='text-red-400 mt-2'>{errors.files}</div>}
        </GreenContainer>

        <button
          className='w-44 mt-10 text-white bg-primary hover:bg-secondary rounded-lg px-5 py-2.5 focus:ring-4 focus:ring-tertiary focus:outline-none'
          type='submit'
        >
          {submit ? <Loader /> : 'Ajouter'}
        </button>
      </form>
    </main>
  );
}
