import React from 'react';

interface ComponentProps {
    balise: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: string;
    className?: string;
  }
  
/**
 * Render a title component with a specified HTML tag, title, and class name.
 *
 * @param {Object} props - The component props.
 * @param {string} props.balise - The HTML tag to use for the title element.
 * @param {string} props.title - The title text to display.
 * @param {string} props.className - Additional CSS class names for the title element.
 * @returns {JSX.Element} - The rendered title component.
 */
  function Title({ balise: Balise, children, className }: ComponentProps): JSX.Element {

    const baseStyle: string = 'scroll-m-20 uppercase text-primary break-words';
  
    const style: Record<string, string> = {
      h1: `text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl ${baseStyle} ${className}`,
      h2: `text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${baseStyle} ${className}`,
      h3: `text-2xl font-semibold tracking-tight ${baseStyle} ${className}`,
      h4: `text-xl font-semibold tracking-tight ${baseStyle} ${className}`,
      h5: `text-xl font-semibold tracking-tight ${baseStyle} ${className}`,
      h6: `text-xl font-semibold tracking-tight ${baseStyle} ${className}`,
    };
  
    return <Balise className={style[Balise]}>{children}</Balise>;
  }
  
  export default Title;
  