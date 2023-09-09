import React from 'react';

function Button({ text, className, onClick }: { text: string, className?: string, onClick?: () => void }): JSX.Element {
  className = className ? className : "text-white bg-primary hover:bg-secondary ";
  return (
    <button
      className={`${className} text-w-max rounded-lg px-5 py-2.5 focus:ring-4 focus:ring-tertiary focus:outline-none`}
      aria-label={text}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
