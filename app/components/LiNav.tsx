import Link from 'next/link';

function LiNav({ text, href, prefetch = true }: { text: string; href: string, prefetch?: boolean }) {
  console.log(prefetch);
  return (
    <li>
      <Link
        href={href}
        className='block py-2 pl-3 pr-4 text-gray-900 md:text-white rounded hover:bg-gray-100 focus:ring-4 focus:ring-tertiary focus:outline-none md:hover:bg-transparent md:hover:text-gray-100 md:p-0  '
        aria-current='page'
        prefetch={prefetch}
      >
        {text}
      </Link>
    </li>
  );
}

export default LiNav;
