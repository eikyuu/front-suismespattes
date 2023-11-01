import Link from "next/link"

function LinkOutline({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="focus:outline-none focus:ring-4 focus:ring-tertiary"
    >
      {text}
    </Link>
  )
}

export default LinkOutline
