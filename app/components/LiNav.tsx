import Link from 'next/link';

function LiNav({ text, href, prefetch = true, onClick }: { text: string; href: string, prefetch?: boolean, onClick?: any }) {
  return (
    <li>
      <Link
        href={href}
        className='block py-2 pl-3 pr-4 text-gray-900 lg:text-white rounded hover:bg-gray-100 focus:ring-4 focus:ring-tertiary focus:outline-none lg:hover:bg-transparent lg:hover:text-gray-100 lg:p-0  '
        aria-current='page'
        prefetch={prefetch}
        onClick={onClick}
      >
        {text}
      </Link>
    </li>
  );
}

export default LiNav;
