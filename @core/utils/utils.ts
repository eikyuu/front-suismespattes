import { getSession } from 'next-auth/react';
import { API_URL } from '../constants/global';

export const formatSlug = (slug:any) => {
    slug = slug.replace(/[^a-zA-Z0-9 ]/g, "");
    slug = slug.replace(/\s+/g, "-");
    return slug.toLowerCase();
}

  export const postImages = async (file: any, slug:any) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('slug', slug);

    const session = await getSession();

    const token = session?.user.token;
  
    try {
      const response = await fetch(`${API_URL}walks/images`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {;
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.error('une erreur est survenue lors de l\'upload de l\'image : ', err);
      throw new Error('une erreur est survenue lors de l\'upload de l\'image');
    }
  };

   export const uploadImages = async (form:any) => {
    try {
      const uploadPromises = form.files.map((file:any) => postImages(file, form.name));
      await Promise.all(uploadPromises);
    } catch (err) {
      console.log(err);
      throw new Error('une erreur est survenue lors de l\'upload des images');
    }
  };