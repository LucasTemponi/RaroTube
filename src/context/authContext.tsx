import { createContext, useContext, useState } from "react";

export type AuthContextProps = {
  token: string;
  autentica: (id: string, email: string, token: string, nome: string) => void;
  estaAutenticado: () => boolean;
  deslogarUsuario: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  token: "",
  autentica: (id: string, email: string, token: string, nome: string) => { },
  estaAutenticado: () => false,
  deslogarUsuario: () => {}
});

type Props = {
  children?: React.ReactNode
};
export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState("");

  const autentica = (id: string, email: string, token: string, nome: string) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("email", email);
    localStorage.setItem("nome", nome);
    setToken(token)
  }

  const deslogarUsuario = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("nome");
  }

  const estaAutenticado = () => {
    return token !== null && token !== "";
  }

  return (
    <AuthContext.Provider value={{
      token,
      autentica,
      estaAutenticado,
      deslogarUsuario
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Você somente pode usar este hook debaixo de um <AuthContextProvider>');
  }

  return context;
}