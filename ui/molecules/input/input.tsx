function Input({
  handleChange,
  value,
  error,
  type,
  name,
  placeholder,
  label,
  required,
}: {
  handleChange: any;
  value: any;
  error: any;
  type: string;
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required={required}
        aria-describedby={`pour ${label}`}
      />
      {error && <p className='text-red-500'>{error}</p>}
    </>
  );
}

export default Input;
