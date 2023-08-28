import { getSession } from 'next-auth/react';
import { API_URL } from '../constants/global';
import { tokenFromSession } from '../utils/utils';

export const postDestinationImage = async (formData: any) => {

  const token = await tokenFromSession();

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
    console.error(err);
  }
};

export const postDestination = async (form: any) => {

  const token = await tokenFromSession();

  try {
    const response = await fetch(`${API_URL}walks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

export const postImages = async (file: File, slug: string) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('slug', slug);
  return await postDestinationImage(formData);
};

export const uploadImages = async (form: any) => {
  try {
    const uploadPromises = form.files.map((file: any) => postImages(file, form.name));
    await Promise.all(uploadPromises);
  } catch (err) {
    console.error(err);
    throw new Error('une erreur est survenue lors de l\'upload des images');
  }
};
