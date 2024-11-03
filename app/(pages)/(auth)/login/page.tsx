"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { useHandleAuth } from "../../../../core/hooks/useHandleAuth"
import FormLogin from "../../../../components/form/auth/form-login"

export default function LoginPage() {
  return (
    <div className="container mx-auto my-10">
      <div className="mx-auto rounded-md bg-primary p-10  text-white md:w-96">
        <FormLogin />
      </div>
    </div>
  )
}
