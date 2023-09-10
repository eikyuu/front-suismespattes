import React, { ComponentPropsWithoutRef } from 'react';

type ButtonProps = ComponentPropsWithoutRef<"button">

function Button(props: ButtonProps) {

  return (
    <button
      {...props}
      className={`${props.className} text-white bg-primary hover:bg-secondary w-max rounded-lg px-2 py-2 focus:ring-4 focus:ring-tertiary focus:outline-none uppercase`}
    >
      {props.children}
    </button>
  );
}

export default Button;
