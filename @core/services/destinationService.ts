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

export const fetchDestination = async () => {
  const token = await tokenFromSession();

  try {
    const response = await fetch(`${API_URL}destination`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
    const uploadPromises = files.map((file: any) => postImages(file, form.name));
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
        'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
      },
    })
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}