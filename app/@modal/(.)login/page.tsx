"use client"


import FormLogin from "../../../components/form/auth/form-login"
import Modal from "../../../components/modal"

export default function PageLogin() {
  return (
    <Modal>
      <div className="mx-auto rounded-md bg-primary p-10  text-white md:w-96">
        <FormLogin />
      </div>
    </Modal>
  )
}
