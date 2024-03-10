import { API_URL } from '../constants/global';

export const fetchCityByCodePostal = async (codePostal: string) => {
    try {
        const response = await fetch(`${API_URL}cities/${codePostal}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
    
        return await response.json();
      } catch (err) {
        console.error(err);
      }
}

export const fetchCitiesBySearch = async (search: string) => {
  try {
    const response = await fetch(`${API_URL}cities?q=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}