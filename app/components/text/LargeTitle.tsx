function LargeTitle({ title } : { title: string } ): JSX.Element {
    return ( 
        <h1 className="text-4xl font-semibold text-center text-primary lowercase first-letter:uppercase">{title}</h1>
     );
}

export default LargeTitle;