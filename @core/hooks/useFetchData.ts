import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

 export function useFetchData(url: any, setState: any) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}${url}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setState(data);
    } catch (error) {
      console.log(error);
      // Handle error and provide feedback to the user
      toast.error('Quelque chose c\'est mal passé. Merci d\'essayer plus tard');
    }
  }, [url, setState, API_URL]);

    useEffect(() => {

      fetchData();
      return () => {
        setState([]);
      }
    }, [url, setState, API_URL, fetchData]);

  };