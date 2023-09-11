function TextGray({text, className}: {text: string, className?: string}): JSX.Element {
    return ( 
        <p className={`${className} text-bgray`}>{text}</p>
     );
}

export default TextGray;