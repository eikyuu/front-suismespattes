import { API_URL } from '../constants/global';

export const postMessage = async (form: any) => {
    try {
        const response = await fetch(`${API_URL}contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
        })
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}