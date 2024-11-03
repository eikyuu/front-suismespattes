import { useCallback } from 'react';

export function useHandleChange( setForm: any, setErrors: any) {
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prevForm: any) => ({ ...prevForm, [name]: value }));
        setErrors(null);
    }, [setForm, setErrors]);

    return { handleChange };
}
