interface ComponentProps {
  balise: keyof JSX.IntrinsicElements;
  title: string;
}

function TitleUnderline({ balise: Balise, title }: ComponentProps) {

  const baseStyle = 'font-semibold text-white before:block before:absolute before:h-1 before:w-20 before:-bottom-1 before:bg-white relative mt-10 uppercase';

  const style: { [key: string]: string } = {
    h1: `text-4xl ${baseStyle}`,
    h2: `text-2xl ${baseStyle}`,
    h3: `text-xl ${baseStyle}`,
    h4: `text-xl ${baseStyle}`,
    h5: `text-xl ${baseStyle}`,
    h6: `text-xl ${baseStyle}`,
  };

  return <Balise className={style[Balise]}>{title}</Balise>;
}

export default TitleUnderline;
