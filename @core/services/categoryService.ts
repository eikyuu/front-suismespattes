import { API_URL } from '../constants/global';

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_URL}categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return await response.json();
    } catch (err) {
        console.error(err);
    }
};