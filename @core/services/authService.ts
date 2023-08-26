import { API_URL } from '../constants/global'

export const authenticate = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
    if (res.ok) {
        const data = await res.json()
        return data
    } else {
        throw new Error(res.statusText)
    }
}