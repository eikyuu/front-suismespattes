import toast from 'react-hot-toast';
import { API_URL } from '../constants/global';
import { tokenFromSession } from '../utils/utils';

export const postDestination = async (form: any) => {

  const token = await tokenFromSession();

  try {
    const response = await fetch(`${API_URL}destination`, {
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

export const updateDestination = async (form: any, slug: string) => {
  const token = await tokenFromSession();

  try {
    const response = await fetch(`${API_URL}destination/${slug}`, {
      method: 'PUT',
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
};

export const deleteDestination = async (slug: string) => {
  const token = await tokenFromSession();

  try {
    const response = await fetch(`${API_URL}destination/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    toast.success('La destination a été supprimé avec succès');
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

export const fetchDestination = async (page: number, limit: number) => {
  try {
    const response = await fetch(`${API_URL}destination?page=${page}&limit=${limit}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const fetchDestinationBySlug = async (slug: string) => {
  const token = await tokenFromSession();

  try {
    const response = await fetch(`${API_URL}destination/${slug}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (err) {
    console.error(err);
  }
}

export const uploadImages = async (files: any, form : any) => {
  try {
    const uploadPromises = files.map((file: any) => postImages(file, form.name.trim()));
    await Promise.all(uploadPromises);
  } catch (err) {
    console.error(err);
    throw new Error('une erreur est survenue lors de l\'upload des images');
  }
};

export const postImages = async (file: File, slug: string) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('slug', slug);
  return await postDestinationImage(formData);
};

export const postDestinationImage = async (formData: any) => {
  const token = await tokenFromSession();

  try {
    const response = await fetch(`${API_URL}destination/images`, {
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

export const deleteDestinationImage = async (slug : string) => {
  const token = await tokenFromSession();
  try {
    const response = await fetch(`${API_URL}destination/images/${slug}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

export const getDestinationsByQueries = async (page: number, totalItems: number, cityParam?: string) => {

  const queries = {
    page: page,
    limit: totalItems,
    city: cityParam ? cityParam : '',
  };

  const createQueryString = (queries: any) => {
    const queryString = Object.keys(queries)
      .filter((key) => queries[key] !== null && queries[key] !== '')
      .map((key) => `${key}=${queries[key]}`)
      .join('&');
    return queryString ? `${queryString}` : '';
  };

  
  const url = `${createQueryString(queries)}`;


  try {
    const response = await fetch(`${API_URL}search?${url}`);
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}