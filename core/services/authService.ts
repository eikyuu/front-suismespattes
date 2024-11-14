import { API_URL } from '../constants/global';
import { tokenFromSession } from '../lib/utils';

export const authenticate = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const forgetPassword = async (form: any) => {
  const response = await fetch(`${API_URL}auth/forget-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
}

export const confirmCode = async (form: any) => {
  const response = await fetch(`${API_URL}auth/confirm-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
}
export const resetPassword = async (form: any, resetToken: string) => {
  const response = await fetch(`${API_URL}auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...form, resetToken }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
}
export const register = async (form: any) => {
  const response = await fetch(`${API_URL}user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...form }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return response.json();
}

export const updateUser = async (form: any, id: string) => {
  const token = await tokenFromSession();

  const response = await fetch(`${API_URL}user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ ...form }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
}

export const getUserPicture = async (id: string) => {
  const response = await fetch(`${API_URL}user/${id}/picture`, {
    method: 'GET',
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

export const uploadPicture = async (form: any, id: string) => {
  const token = await tokenFromSession();

    const formData = new FormData();
    formData.append('image', form[0]);

  const response = await fetch(`${API_URL}user/${id}/picture`, {
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
}
