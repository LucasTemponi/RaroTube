import { createContext, useContext, useState } from "react";

export type AuthContextProps = {
  token: string;
  autentica: (id: string, email: string, token: string) => void;
  estaAutenticado: () => boolean;
};

const AuthContext = createContext<AuthContextProps>({
  token: "",
  autentica: (id: string, email: string, token: string) => { },
  estaAutenticado: () => false
});

type Props = {
  children?: React.ReactNode
};
export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState("");

  const autentica = (id: string, email: string, token: string) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("email", email);
    setToken(token)
  }

  const estaAutenticado = () => {
    return token !== null && token !== "";
  }

  return (
    <AuthContext.Provider value={{
      token,
      autentica,
      estaAutenticado
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