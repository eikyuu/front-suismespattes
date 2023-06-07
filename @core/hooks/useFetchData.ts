import { useEffect } from 'react';

 export function useFetchData(url: any, setState: any) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setState(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
      return () => {
        setState([]);
      }
    }, [url, setState]);
  };