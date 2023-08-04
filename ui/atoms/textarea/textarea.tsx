function Textarea({ handleChange, value, describedby, placeholder, name } : { handleChange: any, value: any, describedby: any, placeholder: any, name: any})  {
    return ( 
        <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required
        aria-describedby={describedby}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        rows={10}
      />
     );
}

export default Textarea;