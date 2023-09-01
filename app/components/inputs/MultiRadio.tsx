function MultiRadio({
  radios,
  handleChange,
  value,
}: {
  handleChange: any;
  radios: {
    label: string;
    name: string;
    value: string;
  }[];
  value?: any;
})  {

  console.log(value)
  return (
    <ul className='w-full md:w-fit items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex'>
      {radios.map((radio, i) => (
        <li
          key={Math.random()}
          className={`${
            i !== radios.length - 1 ? 'border-b border-gray-200 sm:border-b-0 sm:border-r' : ''
          } `}
        >
          <div className='flex items-center pl-3'>
            <input
              id={`${radio.name}-${radio.value}`}
              type='radio'
              name={radio.name}
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5'
              required
              value={radio.value}

            />
            <label
              htmlFor={`${radio.name}-${radio.value}`}
              className='w-full p-3 text-sm font-medium text-gray-900'
            >
              {radio.label}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MultiRadio;
