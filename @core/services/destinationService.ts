import { getSession } from 'next-auth/react';
import { API_URL } from '../constants/global';

export const postDestinationImage = async (formData: any) => {

    const session = await getSession();

    const token = session?.token;

    try {
        const response = await fetch(`${API_URL}walks/images`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export const postImages = async (file: File, slug: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('slug', slug);
    return await postDestinationImage(formData);
  };

   export const uploadImages = async (form:any) => {
    try {
      const uploadPromises = form.files.map((file:any) => postImages(file, form.name));
      await Promise.all(uploadPromises);
    } catch (err) {
      console.error(err);
      throw new Error('une erreur est survenue lors de l\'upload des images');
    }
  };