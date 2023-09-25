import { useState } from 'react';

export function useConfirmCode() {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        code: '',
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
            // const res = await fetch('/api/auth/forgot-password', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(form),
            // });

            // if (res.ok) {
            //     setErrors(null);
            //     setForm({ email: '' });
            // } else {
            //     setErrors('Email non trouvé');
            // }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, form, errors, handleChange, handleSubmit };
}