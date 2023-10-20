import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react'

export function useCreateQueryString(query: string) {

    const pathname = usePathname();
    const searchParams = useSearchParams()!;
    const searchParam = searchParams.get(query);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },

        [searchParams]
    );

    return { createQueryString, pathname, searchParam };
}