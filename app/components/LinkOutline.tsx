import Link from 'next/link';

function LinkOutline({href, text}: {href: string ; text: string}) {
    return ( 
        <Link href={href}   className='focus:ring-4 focus:ring-tertiary focus:outline-none'>
            {text}
        </Link>
     );
}

export default LinkOutline;