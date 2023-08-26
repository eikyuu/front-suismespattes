'use client';

import Link from 'next/link';
import LiNav from './LiNav';
import LoginBtn from './button/LoginBtn';

function ContentNavigation() {
  const handleMenuClick = () => {
    const menu = document.getElementById('navbar-search');
    const menuButton = document.querySelector(
      '[data-collapse-toggle="navbar-search"]'
    );
    if (menu && menuButton) {
      menu.classList.toggle('hidden');
      menuButton.classList.toggle('active');
    }
  };

  return (
    <nav className='bg-white border-gray-200'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link href='/' className='flex items-center focus:ring-4 focus:ring-tertiary focus:outline-none'>
          <span className='self-center text-primary text-2xl font-semibold whitespace-nowrap'>
            Au fil des pattes
          </span>
        </Link>
        <div className='flex md:order-2'>
          <button
            onClick={handleMenuClick}
            type='button'
            data-collapse-toggle='navbar-search'
            aria-controls='navbar-search'
            aria-expanded='false'
            className='md:hidden text-gray-500 hover:bg-gray-100 rounded-lg text-sm p-2.5 mr-1 focus:ring-4 focus:ring-tertiary focus:outline-none'
          >
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Recherche</span>
          </button>
          {/* <div className='relative hidden md:block'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-500'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span className='sr-only'>Icon recherche</span>
            </div>
            <input
              type='text'
              id='search-navbar'
              className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-4 focus:ring-tertiary focus:outline-none'
              placeholder='Trouve une balade par ville...'
            />
          </div> */}

          <button
            onClick={handleMenuClick}
            data-collapse-toggle='navbar-search'
            type='button'
            className='inline-flex items-center p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
            aria-controls='navbar-search'
            aria-expanded='false'
          >
            <span className='sr-only'>Menu ouvert</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
        <div
          className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
          id='navbar-search'
        >
          {/* <div className='relative mt-3 md:hidden'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-500'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='text'
              id='search-navbar'
              className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-4 focus:ring-tertiary focus:outline-none '
              placeholder='Trouve une balade par ville'
            />
          </div> */}
          <ul className='flex flex-col items-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white'>
            <LiNav text='Accueil' href='/' />
            <LiNav text='Toutes les balades' href='/toutes-les-balades' />
            <LiNav text='Ajouter une balade' href='/ajouter-une-balade' />
            <LiNav text='A propos' href='/a-venir' />
            <LiNav text='Boutique' href='/a-venir' />
            <LiNav text='Contact' href='/contact' />
            {/* <LoginBtn /> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ContentNavigation;
