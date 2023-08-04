function Label({label, name} : {label: string, name: string}) {
    return ( 
        <label htmlFor={name} className='block mb-2 mt-5 text-sm font-medium text-white'>{label}</label>
     );
}

export default Label;