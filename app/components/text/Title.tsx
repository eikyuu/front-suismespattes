import React from 'react';

interface ComponentProps {
    balise: keyof JSX.IntrinsicElements;
    title: string;
    className?: string;
  }
  
  function Title({ balise: Balise, title, className }: ComponentProps) {

    const baseStyle = 'font-semibold uppercase text-primary';
  
    const style: { [key: string]: string } = {
      h1: `text-3xl md:text-4xl ${baseStyle} ${className}`,
      h2: `text-2xl ${baseStyle} ${className}`,
      h3: `text-xl ${baseStyle} ${className}`,
      h4: `text-xl ${baseStyle} ${className}`,
      h5: `text-xl ${baseStyle} ${className}`,
      h6: `text-xl ${baseStyle} ${className}`,
    };
  
    return <Balise className={style[Balise]}>{title}</Balise>;
  }
  
  export default Title;
  