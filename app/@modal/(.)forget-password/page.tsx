"use client"

import FormForgetPassword from '../../../components/form/auth/form-forget-password'
import Modal from "../../../components/modal"

export default function ForgetPasswordPage() {
  return (
    <Modal>
      <div className="mx-auto rounded-md bg-primary p-10  text-white md:w-96">
        <FormForgetPassword />
      </div>
    </Modal>
  )
}
