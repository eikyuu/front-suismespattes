import { useState } from 'react';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';


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
  errors?: any;
  type: string;
  name: string;
  maxLength?: number;
  label: string;
  required?: boolean;
}) {
  const [typeValue, setTypeValue] = useState(type);

  return (
    <>
      <div className='flex justify-end'>
        <input
          type={typeValue}
          id={name}
          name={name}
          onChange={handleChange}
          value={value}
          required={required}
          aria-describedby={`pour ${label}`}
          maxLength={maxLength}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        />
        {maxLength && (
          <p
            className={`absolute mt-2 mr-2 ${
              value.length > maxLength ? 'text-red-500' : 'text-slate-400'
            }`}
          >
            {value.length} / {maxLength}
          </p>
        )}

        {type === 'password' && (
          <button
            onClick={() =>
              typeValue === 'text'
                ? setTypeValue('password')
                : setTypeValue('text')
            }
            type='button'
            className='text-black absolute mt-3 mr-3'
          >
            {typeValue === 'text' ? (
              <EyeSlashIcon className='w-5 h-5' />
            ) : (
              <EyeIcon className='w-5 h-5' />
            )}
          </button>
        )}
      </div>
      {errors && <div className='text-red-400'>{errors[name]}</div>}
    </>
  );
}

export default Input;
