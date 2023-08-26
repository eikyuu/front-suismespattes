function MediumTitle({title, color}: {title: string, color?: string}): JSX.Element {
    color = color ? color : "text-primary";
    return ( 
        <h2 className={"text-4xl font-semibold text-center " + color}> {title} </h2>
     );
}

export default MediumTitle;