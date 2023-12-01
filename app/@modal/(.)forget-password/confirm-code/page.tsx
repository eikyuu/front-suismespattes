"use client"

import FormConfirmCode from '../../../../components/form/auth/form-confirm-code'
import Modal from '../../../../components/modal'

export default function ConfirmCodePage() {
  return (
    <Modal>
      <div className="mx-auto rounded-md bg-primary p-10  text-white md:w-96">
        <FormConfirmCode />
      </div>
    </Modal>
  )
}
