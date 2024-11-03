import { API_URL } from '../constants/global';

export const fetchCityByCodePostal = async (codePostal: string) => {
    try {
        const response = await fetch(`${API_URL}city/${codePostal}`, {
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
    const response = await fetch(`${API_URL}city?q=${search}`, {
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