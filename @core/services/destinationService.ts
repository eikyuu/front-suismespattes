import toast from 'react-hot-toast';
import { API_URL } from '../constants/global';
import { tokenFromSession } from '../lib/utils';
import { d } from '@tanstack/query-core/build/legacy/queryClient-5b892aba';

export const postDestination = async (form: any) => {
  const token = await tokenFromSession();

  const response = await fetch(`${API_URL}destination`, {
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

  const response = await fetch(`${API_URL}destination/${slug}`, {
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

  const response = await fetch(`${API_URL}destination/${slug}`, {
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

  const response = await fetch(`${API_URL}destination?page=${page}&limit=${limit}`, {
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

  const response = await fetch(`${API_URL}destination`, {
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
  

  const response = await fetch(`${API_URL}users/${id}/destination`, {
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

  const response = await fetch(`${API_URL}destination/${slug}`, {
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

  const response = await fetch(`${API_URL}destination/images`, {
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

export const getDestinationsByQueries = async (page: number, totalItems: number, cityParam: string = '', categoryParam:string = '') => {

  const queries = {
    page: page,
    limit: totalItems,
    city: cityParam ? cityParam : '',
    category: categoryParam ? categoryParam : '',
  };

  // console.log(queries);

  // const createQueryString = (queries: any) => {
  //   console.log(queries);
  //   const queryString = Object.keys(queries)
  //     .filter((key) => queries[key] !== null && queries[key] !== '')
  //     .map((key) => `${key}=${queries[key]}`)
  //     .join('&');

  //     console.log(queryString);
  //   return queryString ? `${queryString}` : '';
  // };

  // const url = `${createQueryString(queries)}`;

  // console.log(url);

  try {
    // const response = await fetch(`${API_URL}search?page=1&limit=12&city=Tours&category=plage`);
    const response = await fetch(`${API_URL}search?page=${page}&limit=${totalItems}&city=${cityParam}&category=${categoryParam}`);
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
    const response = await fetch(`${API_URL}destination/geocode`, {
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