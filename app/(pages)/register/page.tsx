"use client"

import FormRegister from '../../../components/form/auth/form-register'

export default function RegisterPage() {
  return (
    <div className="container mx-auto my-10">
      <div className="mx-auto rounded-md bg-primary p-10  text-white md:w-96">
        <FormRegister />
      </div>
    </div>
  )
}
