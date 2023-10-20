import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useHandleModal } from '../@core/hooks/useHandleModal';

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
  const { toggle } = useHandleModal();
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
            className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-primary rounded-md w-11/12 md:w-96 h-auto p-10'
          >
            <div
              className='absolute -ml-12 -mt-12 bg-tertiary rounded-full h-10 w-10 flex items-center justify-center text-white hover:bg-tertiary hover:text-black cursor-pointer hover:scale-110 transition ease duration-300 shadow'
              onClick={() => toggle()}
            >
              <p className='text-xl'>
                <XMarkIcon className='w-5 h-5' />
              </p>
            </div>
            {children}
          </div>
        </>
      )}
    </React.Fragment>
  );
}

export default Modal;
