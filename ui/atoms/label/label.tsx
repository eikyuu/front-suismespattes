function Label({label, name, required} : {label: string, name: string, required?: boolean}) {
    return ( 
        <label htmlFor={name} className='block mb-2 mt-5 text-sm font-medium text-white'>{label} {required && '*'}</label>
     );
}

export default Label;