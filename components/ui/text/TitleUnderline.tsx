interface ComponentProps {
  balise: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title: string;
  className?: string;
}

/**
 * Render a title with an underline with a specified HTML tag, title, and class name.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.balise - The HTML tag to use for the title element.
 * @param {string} props.title - The title text to display.
 * @param {string} props.className - Additional CSS class names for the title element.
 * @returns {JSX.Element} - The rendered title component.
 */
function TitleUnderline({ balise: Balise, title, className }: ComponentProps): JSX.Element {

  const baseStyle: string = 'font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10 uppercase';

  const style: Record<string, string> = {
    h1: `text-4xl ${baseStyle} ${className}`,
    h2: `text-2xl ${baseStyle} ${className}`,
    h3: `text-xl ${baseStyle} ${className}`,
    h4: `text-xl ${baseStyle} ${className}`,
    h5: `text-xl ${baseStyle} ${className}`,
    h6: `text-xl ${baseStyle} ${className}`,
  };

  return <Balise className={style[Balise]}>{title}</Balise>;
}

export default TitleUnderline;
