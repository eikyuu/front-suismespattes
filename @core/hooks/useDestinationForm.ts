
import {  useEffect, useState } from 'react';
import { DestinationFormPick, Destination } from '../types/DestinationForm';
import toast from 'react-hot-toast';
import { fetchDestinationBySlug, postDestination, updateDestination, uploadImages } from '../services/destinationService';
import { useRouter } from 'next/navigation'
import { formatSlug } from '../utils/utils';

export function useDestinationForm(slug?: string) {
  const router = useRouter();

  const [form, setForm] = useState<any>({
    name: '',
    description: '',
    city: '',
    postalCode: '',
    street: '',
    country: '',
    latitude: '',
    longitude: '',
    obligatoryLeash: 'YES',
    waterPoint: false,
    processionaryCaterpillarAlert: false,
    cyanobacteriaAlert: false,
    note: 0
  });
  const [files, setFiles] = useState<any>([]);
  const [submit, setSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (slug) {
      fetchDestination();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const fetchDestination = async () => {
    try {
      const res = await fetchDestinationBySlug(slug!);
      console.log(res);
      // delete res.images;
      console.log(res);
      setForm(res); 

    }
    catch (err) {
      console.error(err);
      toast.error('Une erreur est survenue lors de la récupération de la promenade');
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    const updatedForm = {
      ...form,
      [name]: type === 'checkbox' ? checked : value,
      waterPoint: name === 'waterPoint' ? value === 'YES' : form.waterPoint,
      processionaryCaterpillarAlert:
        name === 'processionaryCaterpillarAlert'
          ? value === 'YES'
          : form.processionaryCaterpillarAlert,
      cyanobacteriaAlert:
        name === 'cyanobacteriaAlert' ? value === 'YES' : form.cyanobacteriaAlert,
    };
    setForm(updatedForm);
    setErrors({ ...errors, [name]: '' });
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmit(true);
    const isValid = validateForm();
    if (!isValid) {
      setSubmit(false);
      return;
    }

    if (slug) {
      try {
        await updateDestination(form, slug);
        await uploadImages(files, form);
        toast.success('Votre promenade a bien été modifiée');
        router.push(`/destination/${formatSlug(form.name)}/edit`);
      }
      catch (err) {
        toast.error('Une erreur est survenue lors de la modification de la promenade');
      } finally {
        setSubmit(false);
      }
    }

    try {
      await postDestination(form);
      await uploadImages(files, form);
      toast.success('Votre promenade a bien été ajoutée');
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors de l\'ajout de la promenade');
    } finally {
      setSubmit(false);
      setForm({
        name: '',
        description: '',
        city: '',
        postalCode: '',
        street: '',
        country: '',
        latitude: '',
        longitude: '',
        obligatoryLeash: 'YES',
        waterPoint: false,
        processionaryCaterpillarAlert: false,
        cyanobacteriaAlert: false,
        note: 0,
      });
      setFiles([]);
      setErrors({});
      e.target.reset();
    }
  };

  const handleFileChange = (e: any) => {
    const { files } = e.target;
    console.log(files);
    // si la taille du fichier est supérieur à 3mb
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 3000000) {
        setErrors({ ...errors, images: `Le fichier ${files[i].name} doit être inférieur à 3 Mo` });
        return
      }
      if (files[i].type !== 'image/jpeg' && files[i].type !== 'image/png' && files[i].type !== 'image/jpg') {
        setErrors({ ...errors, images: `Le fichier ${files[i].name} doit être au format jpg ou png` });
     }
    }

    if (files.length === 0) {
      setErrors({ ...errors, images: 'Veuillez ajouter au moins un fichier' });
      return
    }

    if (files.length > 5) {
      setErrors({ ...errors, images: 'Veuillez ajouter au maximum 5 fichiers' });
      return
    }

    if (files.length > 0) {
      setErrors({ ...errors, images: '' });
    }

    
    let inputsTemp = [];
    for (let i = 0; i < files.length; i++) {
      inputsTemp.push(files[i]);
    }
    setFiles(inputsTemp);
  };

  const validateForm = () => {
    let valid = true;
    let errorsTemp = { ...errors };

    const validatorsRules = {
      name: {
        label: 'nom de la promenade',
        minLength: 3,
        maxLength: 50,
      },
      description: {
        label: 'description',
        minLength: 10,
        maxLength: 1000,
      },
      city: {
        label: 'ville',
        minLength: 3,
        maxLength: 50,
      },
      postalCode: {
        label: 'code postal',
        minLength: 3,
        maxLength: 5,
      },
      street: {
        label: 'rue',
        minLength: 3,
        maxLength: 50,
      }
    };

    Object.keys(validatorsRules).forEach((key) => {
      const { label, minLength, maxLength } = validatorsRules[key as keyof typeof validatorsRules];
      switch (true) {
        case form[key as keyof DestinationFormPick].length === 0:
          errorsTemp = { ...errorsTemp, [key]: `Le ${label} est obligatoire` };
          valid = false;
          break;
        case form[key as keyof DestinationFormPick].length < minLength:
          errorsTemp = { ...errorsTemp, [key]: `Le ${label} doit contenir au minimum ${minLength} caractères` };
          valid = false;
          break;
        case form[key as keyof DestinationFormPick].length > maxLength:
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


  return { form, submit, handleChange, handleSubmit, handleFileChange, errors, files };
}