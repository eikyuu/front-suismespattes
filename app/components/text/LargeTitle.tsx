function LargeTitle({ title } : { title: string } ): JSX.Element {
    return ( 
        <h1 className="text-4xl font-semibold text-center text-primary">{title}</h1>
     );
}

export default LargeTitle;