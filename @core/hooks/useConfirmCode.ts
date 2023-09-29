import { useCallback, useState } from 'react';
import { API_URL } from '../constants/global';
import { useHandleChange } from './useHandleChange';

export function useConfirmCode() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ resetToken: '' });
    const [errors, setErrors] = useState<string | null>(null);

    const { handleChange } = useHandleChange(setForm, setErrors);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}auth/confirm-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                setErrors(null);
                setForm({ resetToken: '' });
            } else {
                setErrors('Code incorrect ou expiré');
            }

            return response;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [form]);

    return { loading, form, errors, handleChange, handleSubmit };
}
