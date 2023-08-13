function Input({
  handleChange,
  value,
  errors,
  type,
  name,
  placeholder,
  label,
  required,
}: {
  handleChange: any;
  value: any;
  errors: any;
  type: string;
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
}) {
  return (
    <>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          required={required}
          aria-describedby={`pour ${label}`}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        />
        {errors && <div className='text-red-400'>{errors[name]}</div>}

    </>
  );
}

export default Input;
