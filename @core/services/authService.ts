import { API_URL } from '../constants/global';

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
    console.log(err);
  }
};