function LargeTitle({ title, color } : { title: string, color?: string } ): JSX.Element {
    color = color ? color : "text-primary";
    return ( 
        <h1 className={`text-4xl font-semibold text-center uppercase ${color}`} >{title}</h1>
     );
}

export default LargeTitle;