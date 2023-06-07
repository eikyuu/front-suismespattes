import Button from '../../atoms/button/button';
import InputSearch from '../../atoms/inputSearch/inputSearch';

function ContentNavigation() {
  return (
    <div className='absolute p-5 bg-primary rounded-tr-lg rounded-br-lg w-128 hidden lg:block'>
      <ul className='flex justify-between items-center'>
        <li>
          <InputSearch />
        </li>
        <li>
          <a>
            <p className='text-white'>Se connecter</p>
          </a>
        </li>
        <li>
          <a>
            <Button text='inscription' />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ContentNavigation;
