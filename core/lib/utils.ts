import { getSession } from 'next-auth/react';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getUser = async () => {
    const user = await userFromSession()
    return user
  }