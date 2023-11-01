import Link from "next/link"

function LiNav({
  text,
  href,
  prefetch = true,
  onClick,
}: {
  text: string
  href: string
  prefetch?: boolean
  onClick?: any
}) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-tertiary lg:p-0 lg:text-white lg:hover:bg-transparent lg:hover:text-gray-100  "
        aria-current="page"
        prefetch={prefetch}
        onClick={onClick}
      >
        {text}
      </Link>
    </li>
  )
}

export default LiNav
