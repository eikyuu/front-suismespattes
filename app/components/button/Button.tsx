import React from 'react';

function Button({ text, onClick }: { text: string, onClick?: () => void }): JSX.Element {
  return (
    <button
      className='w-max text-white bg-primary hover:bg-secondary rounded-lg px-5 py-2.5 focus:ring-4 focus:ring-tertiary focus:outline-none'
      aria-label={text}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
