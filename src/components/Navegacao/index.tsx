import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import Toggle from '../Toggle/Toggle';


export const Navegacao = () => {
  const { estaAutenticado, deslogarUsuario } = useAuthContext();
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem('nome');
  const emailUsuario = localStorage.getItem('email');
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    deslogarUsuario();
    navigate(`/`);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  if (estaAutenticado) {
    return (
      <>
        <div className=' relative inline-block text-left dropdown z-20 left-5 md:left-0'>
          <div className='flex'>
            <button
              className='flex items-center font-bold underline decoration-raro-rosa dark:text-gray-100 px-4 py-2 text-lg text-raro-cobalto hover:text-raro-rosa'
              onClick={() => setIsOpen(!isOpen)}
              type='button'
              aria-haspopup='true'
              aria-expanded='true'
              aria-controls='headlessui-menu-items-117'
            >
              <p className='truncate '>{nomeUsuario}</p>
              <svg
                className='w-5 h-5 ml-2 -mr-1'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fill-rule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className=' invisible  dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95'>
              <div
                className='absolute right-0 w-64 sm:w-56 mt-2 origin-top-right bg-white border dark:divide-gray-600 dark:bg-gray-800 dark:border-gray-800 border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
                aria-labelledby='headlessui-menu-button-1'
                id='headlessui-menu-items-117'
                role='menu'
              >
                <div className='px-4 py-3'>
                  <p className=' text-base leading-5 dark:text-white'>
                    Logado por
                  </p>
                  <p className='text-lg sm:text-base dark:text-raro-violeta font-medium leading-5 text-raro-cobalto truncate'>
                    {emailUsuario}
                  </p>
                </div>
                <div className='py-1'>
                  {/* <Toggle /> */}
                  <Link to={`/solicitarcodigo`}>
                    <button
                      className='text-raro-cobalto flex justify-between dark:text-white w-full px-4 py-2 z-1 text-lg sm:text-base leading-5 text-left dark:hover:text-raro-rosa hover:text-raro-rosa'
                      role='menuitem'
                    >
                      Alterar senha
                    </button>
                  </Link>
                  <button
                    className='text-raro-cobalto flex dark:text-white justify-between w-full px-4 py-2 z-2 text-lg sm:text-base leading-5 text-left hover:text-raro-rosa dark:hover:text-raro-rosa'
                    role='menuitem'
                    onClick={() => logout()}
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
  return (
    <div className='flex flex-row space-x-4'>
      <button
        onClick={() => {
          navigate('/login');
        }}
        className='font-bold underline  text-xs md:text-lg dark:hover:text-raro-rosa decoration-raro-rosa px-2 py-2  text-raro-cobalto hover:text-raro-rosa dark:text-gray-100'
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate('/cadastro');
        }}
        className='font-bold underline text-xs md:text-lg dark:hover:text-raro-rosa decoration-raro-rosa px-1 py-1  text-raro-cobalto hover:text-raro-rosa dark:text-gray-100'
      >
        Cadastre-se
      </button>
    </div>
  );
};
