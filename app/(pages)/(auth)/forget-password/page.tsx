"use client"

import FormForgetPassword from "../../../../components/form/auth/form-forget-password"

export default function ForgetPasswordPage() {
  return (
    <div className="container mx-auto my-10">
      <div className="mx-auto rounded-md bg-primary p-10  text-white md:w-96">
        <FormForgetPassword />
      </div>
    </div>
  )
}
