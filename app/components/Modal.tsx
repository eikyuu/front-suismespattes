import React from 'react';

type ModalProps = {
  children: React.ReactNode;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Renders a modal component.
 *
 * @param {ModalProps} props - The props for the modal component.
 * @returns {JSX.Element} The rendered modal component.
 */
function Modal({ children, setModal }: ModalProps): JSX.Element {
  const clickOutside = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('#modal')) {
      setModal(false);
    }
  };

  document.addEventListener('click', clickOutside, true);

  return (
    <React.Fragment>
      <div className='!-ml-0 w-full h-full fixed top-0 left-0 z-50 bg-black bg-opacity-40'>
        <div className='fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center'>
          <div
            id='modal'
            className='fixed z-50 text-white bg-primary rounded-lg w-11/12 md:w-96 h-auto p-10'
          >
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Modal;
