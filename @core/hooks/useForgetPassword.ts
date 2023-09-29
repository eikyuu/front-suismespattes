import { useCallback, useState } from 'react';
import { API_URL } from '../constants/global';
import toast from 'react-hot-toast';
import { useHandleChange } from './useHandleChange';

export function useForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: '' });
    const [errors, setErrors] = useState<string | null>(null);

    const { handleChange } = useHandleChange(setForm, setErrors);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}auth/forget-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                setErrors(null);
                setForm({ email: '' });
            }

            toast.success('Si cette adresse email existe, un email vous a été envoyé');
            return response;
        } catch (error) {
            toast.error('Une erreur est survenue veuillez réessayer ou contactez l\'administrateur');
        } finally {
            setLoading(false);
        }
    }, [form]);

    return { loading, form, errors, handleChange, handleSubmit };
}
