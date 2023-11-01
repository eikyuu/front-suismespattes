function MultiRadio({
  handleChange,
  form,
  options,
}: {
  handleChange: any
  form?: any
  options: { label: string; name: string; value: string }[]
}) {
  return (
    <ul className="w-full items-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 sm:flex md:w-fit">
      {options.map((option, i) => (
        <li
          key={i}
          className={`${
            i !== options.length - 1
              ? "border-b border-gray-200 sm:border-b-0 sm:border-r"
              : ""
          } `}
        >
          <div className="flex items-center pl-3">
            <input
              id={`${option.name}-${option.value}`}
              type="radio"
              name={option.name}
              onChange={handleChange}
              className="block w-auto rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              required
              value={option.value}
              checked={form[option.name] === option.value}
            />
            <label
              htmlFor={`${option.name}-${option.value}`}
              className="w-full p-3 text-sm font-medium text-gray-900"
            >
              {option.label}
            </label>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MultiRadio
