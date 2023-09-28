import { useState } from 'react';
import { API_URL } from '../constants/global';
import { useHandleModal } from './useHandleModal';

export function useResetPawword() {
    const {toggle} = useHandleModal();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        password: '',
    });

    const [errors, setErrors] = useState<string | null>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors(null);
    };

    const handleSubmit = async (e: any, resetToken: string) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...form, resetToken }),
            });

            if (res.ok) {
                setErrors(null);
                setForm({ password: '' });
                toggle();
            } else {
                setErrors('Mot de passe trop faible'); 
            }
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, form, errors, handleChange, handleSubmit };
}