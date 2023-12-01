"use client"

import FormResetPassword from '../../../../components/form/auth/form-reset-password'
import Modal from '../../../../components/modal'

export default function ResetPasswordPage() {
  return (
    <Modal>
      <div className="mx-auto rounded-md bg-primary p-10  text-white md:w-96">
        <FormResetPassword />
      </div>
    </Modal>
  )
}
