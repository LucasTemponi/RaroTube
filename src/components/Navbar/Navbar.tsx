import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { useVideos } from '../../hooks/useVideos';
import apiClient from '../../services/api-client';
import { Navegacao } from '../Navegacao';
import { SideBar } from '../Sidebar/Sidebar';

export type Props = {
  children: ReactNode;
};

const Navbar: React.FC<Props> = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false);


  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className='flex flex-col sm:justify-between sm:flex-row z-20 bg-gray-50 px-6 py-4 w-full'>
        <div className='flex items-center space-x-5 '>
          <div className='cursor-pointer absolute sm:relative left-10 sm:left-0 ' onClick={handleClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              role='img'
              width='30'
              height='30'
              preserveAspectRatio='xMidYMid meet'
              viewBox='0 0 256 256'
            >
              <path
                fill='#343090'
                d='M220 128a4 4 0 0 1-4 4H40a4 4 0 0 1 0-8h176a4 4 0 0 1 4 4ZM40 68h176a4 4 0 0 0 0-8H40a4 4 0 0 0 0 8Zm176 120H40a4 4 0 0 0 0 8h176a4 4 0 0 0 0-8Z'
              />
            </svg>

          </div>
          <Link to={'/'} className='flex items-center h-12 w-32'>
            <Logo />
          </Link>
        </div>
        <div className='flex items-center space-x-2 font-bold'>
          <Navegacao />
        </div>
      </header>

        <SideBar isOpen={isOpen}>         
          {children}
        </SideBar>

    </>
  );
};

export default Navbar;
