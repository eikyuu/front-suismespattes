function Label({label, name, required, color} : {label: string, name: string, required?: boolean, color?: string}): JSX.Element {

    color = color ? color : "white";
    
    return ( 
        <label htmlFor={name} className={`block mb-2 mt-5 text-sm font-medium text-${color}`}>{label} {required && '*'}</label>
     );
}

export default Label;