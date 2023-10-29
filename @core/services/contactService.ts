import { API_URL } from '../constants/global';

/**
 * Sends a POST request to the API to post a message.
 * @param form - The form data to be sent in the request.
 * @returns A Promise that resolves to the response data from the API.
 */
export const postMessage = async (form: FormData): Promise<any> => {
    try {
        const response = await fetch(`${API_URL}contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
        });
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}