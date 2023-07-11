import Link from 'next/link';

function LiNav({ text, href }: { text: string; href: string}) {
  return (
    <li>
      <Link
        href={href}
         
        className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 focus:ring-4 focus:ring-tertiary focus:outline-none md:hover:bg-transparent md:hover:text-primary md:p-0  '
        aria-current='page'
      >
        {text}
      </Link>
    </li>
  );
}

export default LiNav;
