
import { useState } from 'react';
import { API_URL } from '../constants/global';
import { uploadImages } from '../utils/utils';
import { WalkFormPick, WalkForm } from '../types/WalkForm';
import toast from 'react-hot-toast';
import { getSession } from 'next-auth/react';

export function useWalkForm() {

  const [form, setForm] = useState<WalkForm>({
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

    // get token form session 
    const session = await getSession();

    const token = session?.token;
    
    const isValid = validateForm();
    if (!isValid) {
      setSubmit(false);
      return;
    }
    try {
      const response = await fetch(`${API_URL}walks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      
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
        case form[key as keyof WalkFormPick].length === 0:
          errorsTemp = { ...errorsTemp, [key]: `Le ${label} est obligatoire` };
          valid = false;
          break;
        case form[key as keyof WalkFormPick].length < minLength:
          errorsTemp = { ...errorsTemp, [key]: `Le ${label} doit contenir au minimum ${minLength} caractères` };
          valid = false;
          break;
        case form[key as keyof WalkFormPick].length > maxLength:
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
