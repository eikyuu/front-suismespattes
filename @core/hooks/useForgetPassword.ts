import { useState } from 'react';
import { API_URL } from '../constants/global';
import toast from 'react-hot-toast';

export function useForgetPassword() {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: '',
    });

    const [errors, setErrors] = useState<string | null>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors(null);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}auth/forget-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setErrors(null);
                setForm({ email: '' });
            }

            toast.success('Si cette adresse email existe, un email vous a été envoyé');

            return res;
        } catch (error) {
            toast.error('Une erreur est survenue veuillez réessayer ou contactez l\'administrateur');
        } finally {
            setLoading(false);
        }
    };

    return { loading, form, errors, handleChange, handleSubmit };
}