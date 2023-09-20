import LinkOutline from './LinkOutline';

function Footer() {
    return ( 
        <footer className='bg-white'>
        <div className='mx-auto container p-4 py-6 lg:py-8'>
          <div className='md:flex md:justify-between'>
          <ul className='flex flex-col md:flex-row md:space-x-6'>
            <li>
              <LinkOutline href='https://au-fil-des-pattes.vercel.app' text=' Au fil des pattes™'/>
            </li>
            <li>
              <LinkOutline href='/contact' text='Contact'/>
            </li>
            <li>
              <LinkOutline href='/mentions-legales' text='Mentions légales'/>
            </li>
            <li>
              <LinkOutline href='/conditions-generales-utilisation' text='CGU'/>
            </li>
            <li>
              <LinkOutline href='/a-venir' text='Plan du site'/>
            </li>
          </ul>
          </div>
          <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
          <div className='sm:flex sm:items-center sm:justify-between'>
            <span className='text-sm text-gray-500 sm:text-center'>
              © Copyright 2023
              <LinkOutline href='https://au-fil-des-pattes.vercel.app' text=' Au fil des pattes™'/>
              . Tous droits réservés.
            </span>
          </div>
        </div>
      </footer>
     );
}

export default Footer;