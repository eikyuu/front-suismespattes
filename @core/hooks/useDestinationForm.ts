
import { useEffect, useState } from 'react';
import { DestinationFormPick } from '../types/DestinationForm';
import toast from 'react-hot-toast';
import { fetchDestinationBySlug, postDestination, updateDestination, deleteDestinationImage, uploadImages } from '../services/destinationService';
import { useRouter } from 'next/navigation'
import { formatSlug } from '../utils/utils';
import { format } from 'path';

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
    obligatoryLeash: '',
    waterPoint: '',
    processionaryCaterpillarAlert: '',
    cyanobacteriaAlert: '',
    note: ''
  });
  const [images, setImages] = useState<any>([]);
  const [submit, setSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});

  const formTemp = (form: any) => {
    return {
      ...form,
      waterPoint: form.waterPoint === 'YES' ? true : false,
      processionaryCaterpillarAlert: form.processionaryCaterpillarAlert === 'YES' ? true : false,
      cyanobacteriaAlert: form.cyanobacteriaAlert === 'YES' ? true : false
    };
  }

  useEffect(() => {
    if (slug) {
      fetchDestination();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])


  const fetchImage = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], 'image.png', { type: 'image/png' });
  }

  const fetchDestination = async () => {
    setLoading(true);
    try {
      const destination = await fetchDestinationBySlug(slug!);
      setForm({
        ...destination,
        waterPoint: destination.waterPoint ? 'YES' : 'NO',
        processionaryCaterpillarAlert: destination.processionaryCaterpillarAlert ? 'YES' : 'NO',
        cyanobacteriaAlert: destination.cyanobacteriaAlert ? 'YES' : 'NO',
      });

      const imageFiles = await Promise.all(destination.images.map(async (image: any) => {
        const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}destination/images/${image.name}`;
        return await fetchImage(imageUrl);
      }));
      console.log(imageFiles);
      setImages(imageFiles);
    }
    catch (err) {
      console.error('Erreur lors de la récupération de la destination', err);
      toast.error('Une erreur est survenue lors de la récupération de la destination');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    const updatedForm = {
      ...form,
      [name]: value
    };
    setForm(updatedForm);
    setErrors({ ...errors, [name]: '' });
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  
  setSubmit(true);
  
  const isValid = validateForm();
  
  if (!isValid) {
    setSubmit(false);
    return;
  }
  
  try {
    if (slug) {
      const updatePromise = updateDestination(formTemp(form), slug);
      const deleteDestinationPromise = deleteDestinationImage(formatSlug(form.name));
      const uploadPromise = uploadImages(images, formTemp(form));
      
      await Promise.all([updatePromise, deleteDestinationPromise, uploadPromise]);
      
      toast.success('Votre promenade a bien été modifiée');
      router.push(`/destination/${formatSlug(form.name)}`);
    } else {
      const res = await postDestination(formTemp(form));
      
      if (res.ok) {
        await uploadImages(images, form);
        
        toast.success('Votre promenade a bien été ajoutée');
        
        setForm({
          name: '',
          description: '',
          city: '',
          postalCode: '',
          street: '',
          country: '',
          latitude: '',
          longitude: '',
          obligatoryLeash: '',
          waterPoint: '',
          processionaryCaterpillarAlert: '',
          cyanobacteriaAlert: '',
          note: '',
        });
        
        setImages([]);
        setErrors({});
        router.push(`/destination/${formatSlug(form.name)}`);
      } else {
        toast.error(`${res.error.message}`);
      }
    }
  } catch (err) {
    console.error(err);
    toast.error('Erreur lors de l\'ajout de la promenade veuillez réessayer plus tard ou contacter l\'administrateur');
  } finally {
    setImages([]);
    setSubmit(false);
  }
};

  const deleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleFileChange = (e: any) => {
    const { files } = e.target;
    // si la taille du fichier est supérieur à 3mb
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 3000000) {
        setErrors({ ...errors, images: `Le fichier ${files[i].name} doit être inférieur à 3 Mo` });
        return;
      }
      if (files[i].type !== 'image/jpeg' && files[i].type !== 'image/png' && files[i].type !== 'image/jpg') {
        setErrors({ ...errors, images: `Le fichier ${files[i].name} doit être au format jpg ou png` });
        return;
      }
    }

    if (files.length === 0 && images.length === 0) {
      setErrors({ ...errors, images: 'Veuillez ajouter au moins un fichier' });
      return;
    }

    if (files.length > 5) {
      setErrors({ ...errors, images: 'Veuillez ajouter au maximum 5 fichiers' });
      return;
    }

    if (files.length > 0) {
      setErrors({ ...errors, images: '' });
    }

    let inputsTemp = [...images];
    for (let i = 0; i < files.length; i++) {
      inputsTemp.push(files[i]);
    }
    setImages(inputsTemp);
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

  return { form, submit, handleChange, handleSubmit, handleFileChange, deleteImage,  errors, images, loading };
}