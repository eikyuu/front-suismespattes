import React, { useEffect } from 'react';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: any;
};

/**
 * Renders a modal component.
 *
 * @param {ModalProps} props - The props for the modal component.
 * @returns {JSX.Element} The rendered modal component.
 */
function Modal({ children, isOpen, onOpenChange }: ModalProps): JSX.Element {
  return (
    <React.Fragment>
      {isOpen && (
        <>
          <div
            onClick={onOpenChange}
            className='!-ml-0 w-full h-full fixed top-0 left-0 z-40  bg-black bg-opacity-40'
          />

          <div
            id='modal'
            className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-primary rounded-lg md:w-96 h-auto p-10'
          >
            {children}
          </div>
        </>
      )}
    </React.Fragment>
  );
}

export default Modal;
