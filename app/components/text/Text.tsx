import React from 'react';

interface ComponentProps {
    type: 'alert' | 'bold' | 'gray';
    children: string;
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
  function Text({ type, children, className }: ComponentProps): JSX.Element {
  
    const style: Record<string, string> = {
      alert: `text-red-600 uppercase ${className}`,
      bold: `font-semibold ${className}`,
      gray: `text-bgray ${className}`,
    };
  
    return <p className={style[type]}>{children}</p>;
  }
  
  export default Text;
  