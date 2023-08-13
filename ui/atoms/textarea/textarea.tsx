function Textarea({ handleChange, value, describedby, placeholder, name, errors } : { handleChange: any, value: any, describedby: any, placeholder: any, name: any, errors: any})  {
    return ( 
      <>
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
      {errors.description && <div className='text-red-400'>{errors.description}</div>}
      </>
     );
}

export default Textarea;