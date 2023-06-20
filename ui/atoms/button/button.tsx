import React from 'react'

function Button({text}: { text: string }): JSX.Element {
    return ( 
        <button className='w-max p-2 text-white bg-primary hover:bg-teal-900 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-900 focus:outline-none dark:focus:ring-teal-900'>{text}</button>
     );
}

export default Button;