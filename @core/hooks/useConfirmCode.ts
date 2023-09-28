import { useState } from 'react';
import { API_URL } from '../constants/global';

export function useConfirmCode() {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        resetToken: '',
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
        console.log(form);
        try {
            const res = await fetch(`${API_URL}auth/confirm-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setErrors(null);
                setForm({ resetToken: '' });
            } else {
                setErrors('Code incorrect ou expiré'); 
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