function Input({
  handleChange,
  value,
  errors,
  type,
  name,
  maxLength,
  label,
  required,
}: {
  handleChange: any;
  value: any;
  errors: any;
  type: string;
  name: string;
  maxLength?: string;
  label: string;
  required?: boolean;
}) {
  return (
    <>
      <div className='flex justify-end'>
        <input
          type={type}
          id={name}
          name={name}
          onChange={handleChange}
          value={value}
          required={required}
          aria-describedby={`pour ${label}`}
          className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        />
        {maxLength && (
          <p
            className={`absolute mt-2 mr-2 text-slate-400 ${value.length > maxLength && 'text-red-500'
              }`}
          >
            {value.length} / {maxLength}
          </p>
        )}
      </div>
      {errors && <div className='text-red-400'>{errors[name]}</div>}
    </>
  );
}

export default Input;
