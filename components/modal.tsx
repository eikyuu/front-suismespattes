import React from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

import { useHandleModal } from "../@core/hooks/useHandleModal"

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: any
}

/**
 * Renders a modal component.
 *
 * @param {ModalProps} props - The props for the modal component.
 * @returns {JSX.Element} The rendered modal component.
 */
function Modal({ children, isOpen, onOpenChange }: ModalProps): JSX.Element {
  const { toggle } = useHandleModal()
  return (
    <React.Fragment>
      {isOpen && (
        <>
          <div
            onClick={onOpenChange}
            className="fixed left-0 top-0 z-40 !-ml-0 h-full w-full  bg-black bg-opacity-40"
          />

          <div
            id="modal"
            className="fixed left-1/2 top-1/2 z-50 h-auto w-11/12 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-primary p-10 text-white md:w-96"
          >
            <div
              className="ease absolute -ml-12 -mt-12 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-tertiary text-white shadow transition duration-300 hover:scale-110 hover:bg-tertiary hover:text-black"
              onClick={() => toggle()}
            >
              <p className="text-xl">
                <XMarkIcon className="h-5 w-5" />
              </p>
            </div>
            {children}
          </div>
        </>
      )}
    </React.Fragment>
  )
}

export default Modal
