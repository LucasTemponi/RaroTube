import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/authContext"

export const RequireAuth = () => {
  const authContext = useAuthContext();
  if (authContext.estaAutenticado()) {
    return <Outlet />
  }
  else {
    return <Navigate to={"/login"}/>
  }
}