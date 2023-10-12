'use client';

import Link from 'next/link';
import LiNav from './LiNav';
import LoginBtn from './button/LoginBtn';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Modal from './Modal';
import Login from './form/auth/Login';
import { useHandleModal } from '../../@core/hooks/useHandleModal';
import Image from 'next/image';

function ContentNavigation() {
  const { data: session } = useSession();
  const [navbar, setNavbar] = useState(false);

  const {isOpen, toggle} = useHandleModal();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  })

  const handleMenuClick = () => {
    setNavbar(!navbar);
  };

  const clickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setNavbar(false);
    }
  };
  
  return (
    <header ref={ref}>
      <nav className='bg-primary border-gray-200'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <div className='flex items-center flex-shrink-0'>
            <Link href='/'>
              <Image width={40} height={40} src='/images/logo.webp' alt='logo du site Suis mes pattes' />
            </Link>
          </div>
          <Link
            href='/'
            className='flex items-center focus:ring-4 focus:ring-tertiary focus:outline-none'
          >
            <span className='self-center text-white text-2xl font-extrabold tracking-tight whitespace-nowrap'>
              Suis mes pattes
            </span>
          </Link>
          <div className='flex lg:order-2'>
            <button
              onClick={handleMenuClick}
              data-collapse-toggle='navbar'
              type='button'
              className='inline-flex items-center p-2 text-white rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
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
            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
              navbar ? '' : 'hidden'
            }`}
            id='navbar'
          >
            <ul className='flex flex-col items-center p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-primary'>
              <LiNav text='Accueil' href='/' />
              <LiNav
                text='Destinations'
                href='/destinations-chien-accepte'
              />

              <LiNav
                text='Partager une destination'
                href='/partager-une-destination'
                prefetch={false}
                onClick={(e: any) => {
                  if (!session?.user) {
                    e.preventDefault();
                    toggle();
                    return;
                  }
                }}
              />
              <LiNav text='Boutique' href='/a-venir' />
              <LiNav text='Contact' href='/contact' />
              <LoginBtn />
            </ul>
          </div>
        </div>
      </nav>

      <Modal isOpen={isOpen} onOpenChange={toggle}>
        <Login />
      </Modal>

    </header>
  );
}

export default ContentNavigation;
