import React from 'react';

interface ComponentProps {
    type: 'alert' | 'bold' | 'gray';
    text: string;
    className?: string;
  }
  
/**
 * Render a text component with title, and class name.
 *
 * @param {Object} props - The component props.
 * @param {string} props.type - The type of text to display.
 * @param {string} props.text - The text to display.
 * @param {string} props.className - Additional CSS class names for the title element.
 * @returns {JSX.Element} - The rendered text component.
 */
  function Text({ type, text, className }: ComponentProps): JSX.Element {

    const baseStyle: string = 'font-semibold uppercase text-primary';
  
    const style: Record<string, string> = {
      alert: `text-red-600 uppercase ${baseStyle} ${className}`,
      bold: `font-semibold ${baseStyle} ${className}`,
      gray: `text-bgray ${baseStyle} ${className}`,
    };
  
    return <p className={style[type]}>{text}</p>;
  }
  
  export default Text;
  