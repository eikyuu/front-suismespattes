function MultiRadio({
  handleChange,
  form,
  options
}: {
  handleChange: any;
  form?: any;
  options: { label: string, name: string, value: string }[];
})  {
  return (

<ul className='w-full md:w-fit items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex'>
{options.map((option, i) => (
  <li
    key={i}
    className={`${
      i !== options.length - 1 ? 'border-b border-gray-200 sm:border-b-0 sm:border-r' : ''
    } `}
  >
    <div className='flex items-center pl-3'>
      <input
        id={`${option.name}-${option.value}`}
        type='radio'
        name={option.name}
        onChange={handleChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5'
        required
        value={option.value} 
        checked={form[option.name] === option.value}
      />
      <label
        htmlFor={`${option.name}-${option.value}`}
        className='w-full p-3 text-sm font-medium text-gray-900'
      >
        {option.label}
      </label>
    </div>
  </li>
))}
</ul>

  );
}

export default MultiRadio;
