import { useCallback, useState } from 'react';
import { API_URL } from '../constants/global';
import { useHandleModal } from './useHandleModal';
import { useHandleChange } from './useHandleChange';

export function useResetPassword() {
    const { toggle } = useHandleModal();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ password: '' });
    const [errors, setErrors] = useState<string | null>(null);

    const { handleChange } = useHandleChange(setForm, setErrors);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>, resetToken: string) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...form, resetToken }),
            });

            if (response.ok) {
                setErrors(null);
                setForm({ password: '' });
                toggle();
            } else {
                setErrors('Mot de passe trop faible');
            }

            return response;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [form, toggle]);

    return { loading, form, errors, handleChange, handleSubmit };
}
