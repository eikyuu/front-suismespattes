import { getSession } from 'next-auth/react';

export const formatSlug = (slug:any) => {
    slug = slug.replace(/[^a-zA-Z0-9 ]/g, "");
    slug = slug.replace(/\s+/g, "-");
    return slug.toLowerCase();
}
export const tokenFromSession = async () => {
    const session = await getSession();
    const token = session?.token;
    return token;
}
  
export const userFromSession = async () => {
    const session = await getSession();
    const user = session?.user;
    return user;
}

export const userIdFromSession = async () => {
    const session = await getSession();
    const user = session?.user;
    return user;
}