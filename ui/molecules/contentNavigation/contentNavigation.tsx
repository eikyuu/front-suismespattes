import Link from 'next/link';
import Button from '../../atoms/button/button';
import InputSearch from '../../atoms/inputSearch/inputSearch';

function ContentNavigation() {
  return (
    <div className='absolute p-5 bg-primary rounded-tr-lg rounded-br-lg w-auto hidden lg:block'>
      <ul className='flex justify-between items-center'>
        <li className='pr-5'>
          <InputSearch />
        </li>
        <li className='pr-5'>
          <a>
            <p className='text-white'>Se connecter</p>
          </a>
        </li>
        <li className='pr-5'>
          <a>
            <Button text='inscription' />
          </a>
        </li>
        <li>
          <Link href='toutes-les-balades' prefetch={true}  >
            <p className='text-white'>Toutes les balades</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ContentNavigation;
