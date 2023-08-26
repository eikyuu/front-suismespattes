import { API_URL } from '../constants/global'

export const authenticate = async (email: string, password: string) => {
  return await fetch(`${API_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => res.json()).catch(err => console.log(err))
}