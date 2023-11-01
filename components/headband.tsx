import Link from "next/link"

function Headband() {
  return (
    <div className="flex items-center justify-center bg-white p-1">
      <p className="text-center text-gray-400">
        Suis mes pattes est en cours de construction, n&apos;hésitez pas à nous
        contacter pour nous faire part de vos remarques.
        <Link className="mx-1 font-semibold underline" href="/contact">
          Contact
        </Link>
      </p>
    </div>
  )
}

export default Headband
