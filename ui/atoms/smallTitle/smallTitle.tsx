function smallTitle({title}: {title: string}): JSX.Element {
    return ( 
        <h3 className='text-primary font-semibold text-2xl'>{title}</h3>
     );
}

export default smallTitle;