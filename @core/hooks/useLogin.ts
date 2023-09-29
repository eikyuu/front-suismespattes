
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useHandleModal } from './useHandleModal';
import { useHandleChange } from './useHandleChange';

export function useLogin() {
    const { toggle } = useHandleModal();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<string | null>(null);

    const { handleChange } = useHandleChange(setForm, setErrors);

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { email, password } = form;

            const response = await signIn('credentials', { email, password, redirect: false });

            if (response?.error) {
                setErrors('Email or password incorrect');
            } else {
                toggle();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [form, toggle]);

    return { loading, form, errors, handleChange, handleSubmit };
}
