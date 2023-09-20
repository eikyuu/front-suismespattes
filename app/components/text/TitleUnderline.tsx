interface ComponentProps {
  balise: keyof JSX.IntrinsicElements;
  title: string;
  className?: string;
}

function TitleUnderline({ balise: Balise, title, className }: ComponentProps) {

  const baseStyle = 'font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10 uppercase';

  const style: { [key: string]: string } = {
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
