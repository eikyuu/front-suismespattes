"use client"

import FormResetPassword from '../../../../components/form/auth/form-reset-password'

export default function ResetPasswordPage() {
  return (
    <div className="container mx-auto my-10">
      <div className="mx-auto rounded-md bg-primary p-10  text-white md:w-96">
        <FormResetPassword />
      </div>
    </div>
  )
}
