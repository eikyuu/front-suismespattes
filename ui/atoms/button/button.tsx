import React from 'react'

function Button({text}: { text: string }): JSX.Element {
    return ( 
        <button className='text-white bg-secondary rounded-lg w-32 pt-1 pb-1'>{text}</button>
     );
}

export default Button;