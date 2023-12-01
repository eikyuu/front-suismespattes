"use client"

import FormRegister from '../../../components/form/auth/form-register'
import Modal from "../../../components/modal"

export default function PageRegister() {
  return (
    <Modal>
      <div className="mx-auto rounded-md bg-primary p-10  text-white md:w-96">
        <FormRegister />
      </div>
    </Modal>
  )
}
