
import { useEffect, useState } from 'react';
import { DestinationFormPick } from '../types/DestinationForm';
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
    obligatoryLeash: '',
    waterPoint: '',
    processionaryCaterpillarAlert: '',
    cyanobacteriaAlert: '',
    note: ''
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
      setForm({
        ...res,
        waterPoint: res.waterPoint ? 'YES' : 'NO  ',
        processionaryCaterpillarAlert: res.processionaryCaterpillarAlert ? 'YES' : 'NO  ',
        cyanobacteriaAlert: res.cyanobacteriaAlert ? 'YES' : 'NO  ',
      });

    }
    catch (err) {
      console.error(err);
      toast.error('Une erreur est survenue lors de la récupération de la promenade');
    }
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    console.log(name, value);
    const updatedForm = {
      ...form,
      [name]: value
    };
    setForm(updatedForm);
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formTemp = {
      ...form,
      waterPoint: form.waterPoint === 'YES' ? true : false,
      processionaryCaterpillarAlert: form.processionaryCaterpillarAlert === 'YES' ? true : false,
      cyanobacteriaAlert: form.cyanobacteriaAlert === 'YES' ? true : false
    };

    setSubmit(true);
    const isValid = validateForm();
    if (!isValid) {
      setSubmit(false);
      return;
    }

    if (slug) {
      try {
        const updatePromise = updateDestination(formTemp, slug);
        const uploadPromise = uploadImages(files, formTemp);

        await Promise.all([updatePromise, uploadPromise]);

        toast.success('Votre promenade a bien été modifiée');
        return router.push(`/destination/${formatSlug(formTemp.name)}/edit`);
      } catch (err) {
        toast.error('Une erreur est survenue lors de la modification de la promenade');
      } finally {
        setSubmit(false);
      }
    }

    try {
      const res = await postDestination(formTemp);
      if (res.ok) {
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
        setFiles([]);
        setErrors({});
        e.target.reset();
      } else {
        toast.error(`${res.error.message}`);
      }
      await uploadImages(files, form);
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors de l\'ajout de la promenade veuillez réessayer plus tard ou contacter l\'administrateur');
    } finally {
      setSubmit(false);
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