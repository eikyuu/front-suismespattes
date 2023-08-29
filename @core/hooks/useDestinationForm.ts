
import { useState } from 'react';
import { API_URL } from '../constants/global';
import { DestinationFormPick, DestinationForm } from '../types/DestinationForm';
import toast from 'react-hot-toast';
import { getSession } from 'next-auth/react';
import { postDestination, uploadImages } from '../services/destinationService';

export function useDestinationForm() {

  const [form, setForm] = useState<DestinationForm>({
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
    files: [],
  });
  const [submit, setSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});

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
    try {
      await postDestination(form);
      await uploadImages(form);
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
        files: [],
      });
      setErrors({});
      e.target.reset();
    }
  };

  const handleFileChange = (e: any) => {
    const { files } = e.target;
    // si la taille du fichier est supérieur à 3mb
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 3000000) {
        setErrors({ ...errors, files: `Le fichier ${files[i].name} doit être inférieur à 3 Mo` });
        return
      }
      if (files[i].type !== 'image/jpeg' && files[i].type !== 'image/png' && files[i].type !== 'image/jpg') {
        setErrors({ ...errors, files: `Le fichier ${files[i].name} doit être au format jpg ou png` });
     }
    }

    if (files.length === 0) {
      setErrors({ ...errors, files: 'Veuillez ajouter au moins un fichier' });
      return
    }

    if (files.length > 5) {
      setErrors({ ...errors, files: 'Veuillez ajouter au maximum 5 fichiers' });
      return
    }

    if (files.length > 0) {
      setErrors({ ...errors, files: '' });
    }

    
    let inputsTemp = { ...form };
    for (let i = 0; i < files.length; i++) {
      inputsTemp.files.push(files[i]);
    }
    setForm(inputsTemp);
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


  return { form, submit, handleChange, handleSubmit, handleFileChange, errors };
}
