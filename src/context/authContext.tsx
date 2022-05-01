import { createContext, useContext, useEffect, useState } from 'react';

export type AuthContextProps = {
  token: string;
  foto: string;
  nome: string;
  id: string;
  autentica: (
    id: string,
    email: string,
    token: string,
    nome: string,
    foto: string
  ) => void;
  estaAutenticado: boolean;
  deslogarUsuario: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  token: '',
  foto: '',
  nome: '',
  id: '',
  autentica: (id: string, email: string, token: string, nome: string) => {},
  estaAutenticado: false,
  deslogarUsuario: () => {},
});

type Props = {
  children?: React.ReactNode;
};
export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [foto, setFoto] = useState(localStorage.getItem('foto') || '');
  const [nome, setNome] = useState(localStorage.getItem('nome') || '');
  const [id, setId] = useState(localStorage.getItem('id') || '');

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem('access_token');
    const fotoInLocalStorage = localStorage.getItem('foto');
    const nomeInLocalStorage = localStorage.getItem('nome');
    const idInLocalStorage = localStorage.getItem('id');

    if (
      tokenInLocalStorage &&
      fotoInLocalStorage &&
      nomeInLocalStorage &&
      idInLocalStorage
    ) {
      setToken(tokenInLocalStorage);
      setFoto(fotoInLocalStorage);
      setNome(nomeInLocalStorage);
      setId(idInLocalStorage);
    }
  }, []);

  const autentica = (
    id: string,
    email: string,
    token: string,
    nome: string,
    foto: string
  ) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('email', email);
    localStorage.setItem('nome', nome);
    localStorage.setItem('foto', foto);
    setToken(token);
    setFoto(foto);
  };

  const deslogarUsuario = () => {
    setToken('');
    setFoto('');
    setNome('');
    setId('');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('nome');
    localStorage.removeItem('foto');
  };

  const estaAutenticado = (token !== null && token !== '');

  return (
    <AuthContext.Provider
      value={{
        token,
        autentica,
        estaAutenticado,
        deslogarUsuario,
        foto,
        nome,
        id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'Você somente pode usar este hook debaixo de um <AuthContextProvider>'
    );
  }

  return context;
};
