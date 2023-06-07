function MediumTitle({title, color}: {title: string, color: string}): JSX.Element {
    return ( 
        <h2 className={"text-4xl font-bold text-center " + color}> {title} </h2>
     );
}

export default MediumTitle;