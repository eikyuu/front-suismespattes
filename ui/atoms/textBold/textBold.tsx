function TextBold({text, color}: {text: string, color?: string | undefined}) {

    color = color || 'text-white';

    return ( 
        <p className={`${color} font-semibold`}>{text}</p>
     );
}

export default TextBold;