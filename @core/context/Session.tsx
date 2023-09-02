'use client'

import { useSession } from 'next-auth/react';

export default function Session({ children }: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession();
    return (
      <>
        {status === 'authenticated' && children}
        {status === 'unauthenticated' && children}
      </>
    )
}
