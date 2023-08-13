import { API_URL } from '../constants/global';

export const formatSlug = (slug:any) => {
    slug = slug.replace(/[^a-zA-Z0-9 ]/g, "");
    slug = slug.replace(/\s+/g, "-");
    return slug.toLowerCase();
}

  export const postImages = async (file: any) => {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch(`${API_URL}walks/images`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {;
        console.error('une erreur est survenue lors de l\'upload de l\'image', response.status);
      }
    } catch (err) {
      console.error('une erreur est survenue lors de l\'upload de l\'image : ', err);
    }
  };

   export const uploadImages = async (files:any) => {
    try {
      const uploadPromises = files.map((file:any) => postImages(file));
      await Promise.all(uploadPromises);
    } catch (err) {
      console.log(err);
    }
  };