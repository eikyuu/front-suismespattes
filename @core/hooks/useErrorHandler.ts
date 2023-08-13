const useErrorHandler = () => {
    const errorHandler = (error: any) => {
      if (error.response) {
        let message = "Une erreur est survenue";
        throw error;
      }
      throw error;
    };
  
    return { errorHandler };
  };
  
  export default useErrorHandler;