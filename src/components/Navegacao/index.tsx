import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

export const Navegacao = () => {

  const authContext = useAuthContext();
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem("nome");
  
  const logout = () => {
    authContext.deslogarUsuario()
    navigate(`/`)
    location.reload(); 
  
  }
 

  if (authContext.estaAutenticado()) {
    return (
      <>
      <span>Olá {nomeUsuario}</span>
     
        <button className='rounded-md bg-raro-oceano text-white px-4 py-2 text-sm' onClick = {() => logout()}>
          Logout
        </button>
      
      </>
    )
  }
  else {
    return (
      <Link to={`/login`}>
        <button className='rounded-md bg-raro-oceano text-white px-4 py-2 text-sm'>
          Faça Login
        </button>
     </Link>
    
    )
  }
}

