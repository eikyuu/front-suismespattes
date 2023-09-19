function SmallTitle({title}: {title: string}): JSX.Element {
    return ( 
        <h3 className='text-primary font-semibold text-2xl uppercase'>{title}</h3>
     );
}

export default SmallTitle;