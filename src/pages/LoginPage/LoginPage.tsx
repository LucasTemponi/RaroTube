import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../components/Login/Login";
import api from "../../services/api-client"

export const LoginPage = () => {
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const autenticaUsuario = async (email: string, senha: string) => {
    try {
      const response = await api.post('/auth/login',
        { email, senha }
      );

      const { access_token, id } = response.data;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("id", id);

        navigate("/videos");
      }

    } catch (error: any) {
      if (error.response.data.statusCode === 401) {
        setErro('Usuário ou senha incorretos.');
      } else {
        setErro('Erro ao autenticar usuário. Tente novamente mais tarde.');
      }
    }
  }
  return (
    <Login onLogin={ autenticaUsuario} erro={erro}/>
  );
};