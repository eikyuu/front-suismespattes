
import { useEffect, useState } from 'react';
import { Destination, DestinationFormPick } from '../types/DestinationForm';
import toast from 'react-hot-toast';
import { fetchDestinationBySlug, postDestination, updateDestination, deleteDestinationImage, uploadImages } from '../services/destinationService';
import { useRouter } from 'next/navigation'
import { formatSlug, userFromSession } from '../utils/utils';
import { useHandleChange } from './useHandleChange';

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
    note: '',
    category: '',
    user: '',
  });
  const [images, setImages] = useState<any>([]);
  const [submit, setSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});

  const { handleChange } = useHandleChange(setForm, setErrors);

  const getUser = async () => {
    const user = await userFromSession();
    setForm({ ...form, user: user?.email });
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formTemp = (form: {
    waterPoint: 'YES' | 'NO',
    processionaryCaterpillarAlert: 'YES' | 'NO',
    cyanobacteriaAlert: 'YES' | 'NO'
  }): {
    waterPoint: boolean,
    processionaryCaterpillarAlert: boolean,
    cyanobacteriaAlert: boolean
  } => {
    return {
      ...form,
      waterPoint: form.waterPoint === 'YES',
      processionaryCaterpillarAlert: form.processionaryCaterpillarAlert === 'YES',
      cyanobacteriaAlert: form.cyanobacteriaAlert === 'YES'
    };
  }

  useEffect(() => {
    if (slug) {
      fetchDestination(slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])


  const fetchImage = async (url: string): Promise<File> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], 'image.png', { type: 'image/png' });
      return file;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'image:', error);
      throw error;
    }
  }

  const fetchDestination = async (slug: string): Promise<void> => {
    setLoading(true);
    try {
      const destination: Destination = await fetchDestinationBySlug(slug);
      setForm({
        ...destination,
        waterPoint: destination.waterPoint ? 'YES' : 'NO',
        processionaryCaterpillarAlert: destination.processionaryCaterpillarAlert ? 'YES' : 'NO',
        cyanobacteriaAlert: destination.cyanobacteriaAlert ? 'YES' : 'NO',
      });
      const imageFiles: File[] = await Promise.all(destination.images.map(async (image: any) => {
        const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}destination/images/${image.name}`;
        return await fetchImage(imageUrl);
      }));
      setImages(imageFiles);
    }
    catch (err) {
      console.error('Erreur lors de la récupération de la destination', err);
      toast.error('Une erreur est survenue lors de la récupération de la destination');
    } finally {
      setLoading(false);
    }
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setSubmit(true);

    const isValid: boolean = validateForm(form, errors);

    if (!isValid) {
      setSubmit(false);
      return;
    }

    try {
      if (slug) {
        const updatePromise: Promise<void> = updateDestination(formTemp(form), slug);
        const deleteDestinationPromise: Promise<void> = deleteDestinationImage(formatSlug(form.name));
        const uploadPromise: Promise<void> = uploadImages(images, formTemp(form));

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
            category: '',
            user: ''
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

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > 3000000) {
        setErrors({ ...errors, images: `Le fichier ${file.name} doit être inférieur à 3 Mo` });
        return;
      }

      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setErrors({ ...errors, images: `Le fichier ${file.name} doit être au format jpg ou png` });
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

    setImages([...images, ...files]);
  };

  const validateForm = (
    form: DestinationFormPick,
    errors: Record<keyof DestinationFormPick, string>
  ): boolean => {
    let isValid = true;
    let updatedErrors = { ...errors };

    const validationRules = {
      name: {
        label: 'nom de la promenade',
        minLength: 3,
        maxLength: 50,
      },
      description: {
        label: 'description',
        minLength: 10,
        maxLength: 5000,
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

    Object.keys(validationRules).forEach((key) => {
      const { label, minLength, maxLength } = validationRules[key as keyof typeof validationRules];
      const fieldValue = form[key as keyof DestinationFormPick];

      if (fieldValue.length === 0) {
        updatedErrors = { ...updatedErrors, [key]: `Le ${label} est obligatoire` };
        isValid = false;
      } else if (fieldValue.length < minLength) {
        updatedErrors = { ...updatedErrors, [key]: `Le ${label} doit contenir au minimum ${minLength} caractères` };
        isValid = false;
      } else if (fieldValue.length > maxLength) {
        updatedErrors = { ...updatedErrors, [key]: `Le ${label} doit contenir au maximum ${maxLength} caractères` };
        isValid = false;
      }
    });

    setErrors(updatedErrors);

    return isValid;
  };

  return { form, submit, handleChange, handleSubmit, handleFileChange, deleteImage, errors, images, loading };
}