function Textarea({
  handleChange,
  value,
  describedby,
  maxLength,
  name,
  errors,
}: {
  handleChange: any;
  value: any;
  describedby: any;
  maxLength: any;
  name: any;
  errors: any;
}) {
  return (
    <>
      <div className='flex justify-end items-end'>
        <textarea
          id={name}
          name={name}
          onChange={handleChange}
          value={value}
          required
          aria-describedby={describedby}
          maxLength={maxLength}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          rows={10}
        />

        <p
          className={`absolute mt-2 mr-2 text-slate-400 ${
            value.length > maxLength && 'text-red-500'
          }`}
        >
          {value.length} / {maxLength}
        </p>
      </div>

      {errors && (
        <div className='text-red-400'>{errors[name]}</div>
      )}
    </>
  );
}

export default Textarea;
