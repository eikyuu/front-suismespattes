
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useHandleModal } from './useHandleModal';

/**
 * A custom hook for handling login functionality.
 *
 * @return {object} An object containing the loading state, form state,
 * errors state, handleChange function, and handleSubmit function.
 */
export function useLogin() {
    const {toggle} = useHandleModal();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
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
            const res = await signIn('credentials', {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            if (res && res.error) {
                setErrors('Email ou mot de passe incorrect');
            } else {
                toggle();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, form, errors, handleChange, handleSubmit };
}