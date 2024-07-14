import toast from 'react-hot-toast';
import { API_URL } from '../constants/global';
import { tokenFromSession } from '../lib/utils';
import { d } from '@tanstack/query-core/build/legacy/queryClient-5b892aba';

export const postDestination = async (form: any) => {
  const token = await tokenFromSession();

  const response = await fetch(`${API_URL}destinations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
}

export const updateDestination = async (form: any, slug: string) => {
  const token = await tokenFromSession();

  const response = await fetch(`${API_URL}destinations/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
};

export const deleteDestination = async (slug: string) => {
  const token = await tokenFromSession();

  const response = await fetch(`${API_URL}destinations/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
}

export const fetchDestination = async (page: number, limit: number) => {

  const response = await fetch(`${API_URL}destinations?page=${page}&limit=${limit}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
};

export const fetchDestinations = async () => {

  const response = await fetch(`${API_URL}destinations`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
}

export const fetchDestinationsByUser = async (id: string) => {
  

  const response = await fetch(`${API_URL}users/${id}/destinations`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
}

export const fetchDestinationBySlug = async (slug: string) => {
  const token = await tokenFromSession();

  const response = await fetch(`${API_URL}destinations/${slug}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();

}

export const uploadImages = async (files: any, name: string) => {
  try {
    const uploadPromises = files.map((file: any) => postImages(file, name));
    await Promise.all(uploadPromises);
  } catch (err: any) {
    throw new Error(err.message);
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

  const response = await fetch(`${API_URL}destinations/images`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
};

export const deleteDestinationImage = async (slug: string) => {
  const token = await tokenFromSession();
  try {
    const response = await fetch(`${API_URL}destinations/images/${slug}`, {
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

    if (!response.ok) {
      return {
        destinations: [],
        pagination: {
          total: 0,
          totalPages: 0,
          page: 0,
          limit: 0,
        },
      }
    } 

   return await response.json();
  } catch (err) {
    console.error(err);
  }
}

export const fetchAnchorLocation = async (formBody: any) => {
  try {
    const response = await fetch(`${API_URL}destinations/geocode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    })
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}