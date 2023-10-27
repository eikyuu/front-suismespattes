'use client';

import Image from 'next/image';
import { useDestinationForm } from '../../@core/hooks/useDestinationForm';
import GreenContainer from '../green-container';
import Label from '../inputs/label';
import MultiRadio from '../inputs/multi-radio';
import Loader from '../loader/loader';
import React, { use, useEffect, useState } from 'react';
import { useFetch } from '../../@core/hooks/useFetch';
import { API_URL } from '../../@core/constants/global';
import { Input } from '@/components/ui/input';
import { TrashIcon } from '@heroicons/react/24/outline';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/@core/utils/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Draggable, Map, Marker, Point, ZoomControl } from 'pigeon-maps';
import TitleUnderline from '@/components/ui/text/TitleUnderline';
import Text from '@/components/ui/text/Text';
import dynamic from 'next/dynamic';
import DraggableMarker from '../map/draggableMarker';
export const LeafletMap = dynamic(
  () => import('@/components/map/leaflet-map'),
  { ssr: false }
);



import { useMap } from 'react-leaflet';

type RecenterAutomaticallyProps = {
  lat: number;
  lng: number;
};

const RecenterAutomatically = ({ lat, lng }: RecenterAutomaticallyProps) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

function FormDestination({ slug }: { slug?: string }) {
  const [anchor, setAnchor] = useState({
    lat: 47.39235495962892,
    lng: 0.6897129358274583,
  });

  const {
    handleSubmit,
    handleChange,
    handleFileChange,
    handleChangeCodePostal,
    deleteImage,
    handleAnchor,
    form,
    errors,
    submit,
    images,
    loading,
    cities,
  } = useDestinationForm(slug);

  useEffect(() => {
    if (form.latitude && form.longitude) {
      setAnchor({
        lat: form.latitude,
        lng: form.longitude,
      });
    }
  }, [form.latitude, form.longitude]);

  const [open, setOpen] = React.useState(false);
  const [openCities, setOpenCities] = React.useState(false);
  const [valueCities, setValueCities] = React.useState('');
  const [value, setValue] = React.useState('');

  useEffect(() => {
    handleAnchor(anchor);
  }, [anchor]);

  const fetchAnchorLocation = async () => {
    const formBody = {
      street: form.street,
      city: valueCities,
      postalCode: form.postalCode,
    };

    try {
      const response = await fetch(`${API_URL}destination/geocode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formBody),
      });
      const data = await response.json();
      setAnchor({
        lat: data.lat,
        lng: data.lng,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // FETCH CATEGORIES
  const { data: categories, error } = useFetch<any>(`${API_URL}category`);

  useEffect(() => {
    if (form.category.name) {
      setValue(form.category.name);
    }
  }, [form.category.name]);

  useEffect(() => {
    if (form.city.label) {
      setValueCities(form.city.label);
    }
  }, [form.city.label]);

  const handleSelect = (value: string, nameValue: string) => {
    handleChange({
      target: { name: nameValue, value },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  if (error) {
    toast.error(
      'Une erreur est survenue lors de la récupération des catégories'
    );
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
        <TitleUnderline title='Description' balise='h2' className='!mt-0' />

        <div className='w-auto md:w-1/2'>
          <Label name='name' label='Nom de la destination' required />
          <Input
            onChange={(e: any) => handleChange(e)}
            value={form.name}
            type='text'
            name='name'
            maxLength={50}
            required
          />
          {errors && <div className='text-red-400'>{errors.name}</div>}
        </div>

        <Label
          name='description'
          label='Description de la destination'
          required
        />
        <Textarea
          onChange={(e: any) => handleChange(e)}
          name='description'
          value={form.description}
          maxLength={5000}
        />
        {errors && <div className='text-red-400'>{errors.description}</div>}

        <Label name='category' label='Type de destination' required />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-full md:w-[260px] justify-between capitalize'
            >
              {value
                ? categories.find((category: any) => category.name === value)
                    .name
                : 'Choissisez une categorie'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w- md:w-[260px] p-0 overflow-auto max-h-[20rem]'>
            <Command>
              <CommandInput placeholder='Rechercher une catégorie' />
              <CommandEmpty>Aucune catégorie trouvé.</CommandEmpty>
              <CommandGroup>
                {categories &&
                  categories.map((category: any) => (
                    <CommandItem
                      className='capitalize'
                      key={category.name}
                      onSelect={(currentValue) => {
                        handleSelect(category.id, 'category');
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === category.name ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {category.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {errors && <div className='text-red-400'>{errors.category}</div>}

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
        <TitleUnderline title='Localisation' balise='h2' className='!mt-0' />

        <div className='w-full '>
          <Label name='street' label='N et nom de la rue' required />
          <Input
            onChange={handleChange}
            value={form.street}
            type='text'
            name='street'
            maxLength={50}
            required
          />
          {errors && <div className='text-red-400'>{errors.street}</div>}
        </div>

        <div className='w-full flex flex-col md:flex-row'>
          <div className='md:mr-5'>
            <Label name='postalCode' label='Code postal' required />
            <Input
              onChange={handleChangeCodePostal}
              value={form.postalCode}
              type='text'
              name='postalCode'
              maxLength={5}
              required
            />
            {errors && <div className='text-red-400'>{errors.postalCode}</div>}
          </div>
          <div className=''>
            <Label name='city' label='Ville' required />

            <Popover open={openCities} onOpenChange={setOpenCities}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={openCities}
                  className='w-full md:w-[260px] justify-between capitalize'
                >
                  {valueCities ? valueCities : 'Choissisez une ville'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-full md:w-[260px] p-0 overflow-auto max-h-[20rem]'>
                <Command>
                  <CommandInput placeholder='Rechercher une ville' />
                  <CommandEmpty>Renseigner un code postal.</CommandEmpty>
                  <CommandGroup>
                    {cities &&
                      cities.map((city: any) => (
                        <CommandItem
                          className='capitalize'
                          key={city.id}
                          onSelect={(currentValue) => {
                            handleSelect(city.id, 'city');
                            setValueCities(
                              currentValue === valueCities ? '' : currentValue
                            );
                            setOpenCities(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              valueCities === city.label
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {city.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {errors && <div className='text-red-400'>{errors.city}</div>}
          </div>
        </div>

        <Label name='country' label='Pays' required />
        <Select
          onValueChange={(e) => handleSelect(e, 'country')}
          value={form.country}
          name='country'
          required
        >
          <SelectTrigger className='w-full md:w-[180px]'>
            <SelectValue placeholder='Choissisez un pays' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='FR'>France</SelectItem>
          </SelectContent>
        </Select>

        <Text className='mb-4 mt-4 text-white'>
          Vérifiez la localisation de votre destination. Repositionnez la
          localisation si besoin.
        </Text>

        <div className='w-full h-full  flex flex-col md:flex-row'>
          <LeafletMap
            center={form.latitude ? [form.latitude, form.longitude] : [anchor.lat, anchor.lng]}
            zoom={13}
          >
            <DraggableMarker setAnchor={setAnchor} anchor={anchor} />
             <RecenterAutomatically lat={anchor.lat} lng={anchor.lng}/>                 
          </LeafletMap>
          {/* <Map
            animate={true}
            defaultWidth={600}
            height={400}
            center={anchor as Point}
            defaultZoom={12}
          >
            <Draggable
              anchor={[anchor[0], anchor[1]]}
              onDragEnd={(dragAnchor) => setAnchor(dragAnchor)}
              offset={[25, 30]}
            >
              <Marker
              width={50}
              height={60}
              color={'#0c8892'}
              
              />
            </Draggable>

            <ZoomControl />
          </Map> */}

          <div className='md:ml-5'>
            <Button
              variant={'outline'}
              className='w-full md:w-[180px] mt-5 md:mt-0'
              onClick={() => {
                if (
                  form.street === '' ||
                  form.postalCode === '' ||
                  form.city === '' ||
                  form.country === ''
                ) {
                  toast.error('Veuillez saisir les informations requises');
                  return;
                }
                fetchAnchorLocation();
              }}
              type='button'
            >
              Vérifier la localisation
            </Button>

            <Label name='latitude' label='Latitude' />
            <Input
              onChange={handleChange}
              value={form.latitude}
              type='text'
              name='latitude'
            />

            {errors && <div className='text-red-400'>{errors.latitude}</div>}

            <Label name='longitude' label='Longitude' />
            <Input
              onChange={handleChange}
              value={form.longitude}
              type='text'
              name='longitude'
            />
            {errors && <div className='text-red-400'>{errors.longitude}</div>}
          </div>
        </div>
      </GreenContainer>

      <GreenContainer>
        <TitleUnderline title='Photos' balise='h2' className='!mt-0' />

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
        <Input
          className='w-auto cursor-pointer'
          onChange={(e) => handleFileChange(e)}
          id='multiple_files'
          type='file'
          accept='image/png, image/jpeg, image/jpg'
          multiple
          required={!slug || images.length === 0 ? true : false}
        />
        {errors && <div className='text-red-400 mt-2'>{errors.images}</div>}

        {images.length >= 1 && (
          <div className='flex justify-center items-center flex-col flex-wrap md:flex-row mt-10'>
            {images.map((file: any, index: number) => (
              <React.Fragment key={index}>
                <Image
                  key={index}
                  className='mt-5 md:mr-5 rounded-md shadow-lg h-60 w-60 object-cover object-center'
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
        )}
      </GreenContainer>

      <Button className='mt-10 !w-24 ' type='submit'>
        {submit ? <Loader /> : slug ? 'Modifier' : 'Ajouter'}
      </Button>
    </form>
  );
}

export default FormDestination;
