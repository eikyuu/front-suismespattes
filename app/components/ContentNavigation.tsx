'use client';

import Link from 'next/link';
import LiNav from './LiNav';
import LoginBtn from './button/LoginBtn';
import { useEffect } from 'react';

function ContentNavigation() {
  const handleMenuClick = () => {
    const menu = document.getElementById('navbar');
    const menuButton = document.querySelector(
      '[data-collapse-toggle="navbar"]'
    );
    if (menu && menuButton) {
      menu.classList.toggle('hidden');
      menuButton.classList.toggle('active');
    }
  };

  const clickOutside = (e: any) => {
    if (!e.target.closest('#navbar')) {
      const menu = document.getElementById('navbar');
      const menuButton = document.querySelector(
        '[data-collapse-toggle="navbar"]'
      );
      if (menu && menuButton) {
        menu.classList.add('hidden');
        menuButton.classList.remove('active');
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickOutside, true);
  })

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
            data-collapse-toggle='navbar'
            type='button'
            className='inline-flex items-center p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
            aria-controls='navbar'
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
          id='navbar'
        >
          <ul className='flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white'>
            <LiNav text='Accueil' href='/' />
            <LiNav text='Toutes les destinations' href='/toutes-les-destinations' />
            <LiNav text='Ajouter une destination' href='/ajouter-une-destination' />
            <LiNav text='A propos' href='/a-venir' />
            <LiNav text='Boutique' href='/a-venir' />
            <LiNav text='Contact' href='/contact' />
            <LoginBtn />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ContentNavigation;
