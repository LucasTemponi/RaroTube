import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';

export const Navegacao = () => {
  const { estaAutenticado, deslogarUsuario } = useAuthContext();
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem('nome');

  const logout = () => {
    deslogarUsuario();
    navigate(`/`);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  if (estaAutenticado()) {
    return (
      <>
        <span>Olá {nomeUsuario}</span>
        <button
          className='rounded-md bg-raro-oceano text-white px-4 py-2 text-sm'
          onClick={() => logout()}
        >
          Logout
        </button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => {
          navigate('/login');
        }}
        className='rounded-md bg-raro-oceano text-white px-4 py-2 text-sm'
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate('/cadastro');
        }}
        className='rounded-md bg-raro-oceano text-white px-4 py-2 text-sm'
      >
        Cadastrar
      </button>
    </>
  );
};
