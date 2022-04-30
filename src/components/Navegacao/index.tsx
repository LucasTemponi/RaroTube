import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { Icon } from '@iconify/react';
import userCircleThin from '@iconify/icons-ph/user-circle-thin';

export const Navegacao = () => {
  const { estaAutenticado, deslogarUsuario } = useAuthContext();
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem('nome');
  const emailUsuario = localStorage.getItem('email')
  const [isOpen, setIsOpen] = useState(false)

  const logout = () => {
    deslogarUsuario();
    navigate(`/`);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  if (estaAutenticado) {
    return (
      <>
        <div className=" relative inline-block text-left dropdown">
            <button className="inline flex items-center font-bold underline decoration-raro-rosa px-4 py-2 text-lg text-raro-cobalto hover:text-raro-rosa" onClick={() => setIsOpen(!isOpen)}
              type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
              <p className='truncate'>{nomeUsuario}</p>
              <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          {isOpen &&
            <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
              <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                <div className="px-4 py-3">
                  <p className="text-md leading-5">Logado por</p>
                  <p className="text-md font-medium leading-5 text-raro-cobalto truncate">{emailUsuario}</p>
                </div>
                <div className="py-1">
                  <Link to={`/solicitarcodigo`}>
                    <button className="text-raro-cobalto flex justify-between w-full px-4 py-2 z-1 text-md leading-5 text-left hover:text-raro-rosa" role="menuitem" >Alterar senha</button>
                  </Link>
                  <button className="text-raro-cobalto flex justify-between w-full px-4 py-2 z-2 text-md leading-5 text-left hover:text-raro-rosa" role="menuitem" onClick={() => logout()} >Sair</button>
                </div>
              </div>
            </div>
          }
        </div>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => {
          navigate('/login');
        }}
        className='font-bold underline decoration-raro-rosa px-4 py-2 text-lg text-raro-cobalto hover:text-raro-rosa'
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate('/cadastro');
        }}
        className='font-bold underline decoration-raro-rosa px-4 py-2 text-lg text-raro-cobalto hover:text-raro-rosa'
      >
        Cadastre-se
      </button>
    </>
  );
};
