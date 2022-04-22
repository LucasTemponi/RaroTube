import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdicionarComentario from './components/AdicionarComentario/AdicionarComentario';
import { Cadastro } from './components/Cadastro/Cadastro';
import { CodigoDeRecuperarSenha } from './components/CodigoDeRecuperarSenha/CodigoDeRecuperarSenha';
import Comentario from './components/Comentario/Comentario';
import { Layout } from './components/Layout/Layout';
import ListaComentarios from './components/ListaComentarios/ListaComentarios';
import { Login } from './components/Login/Login';
import { RecuperarSenha } from './components/RecuperarSenha/RecuperarSenha';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { SolicitarCodigo } from './components/SolicitarCodigo/SolicitarCodigo';
import { VideoList } from './components/VideoList/VideoList';
import { AuthContextProvider } from './context/authContext';
import { CadastroPage } from './pages/CadastroPage/CadastroPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { PaginaPrincipal } from './pages/PaginaPrincipal/PaginaPrincipal';
import VideoPage from './pages/VideoPage/VideoPage';


function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route index element={<PaginaPrincipal />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/solicitarcodigo" element={<CodigoDeRecuperarSenha />} />
            <Route path="/alterarsenha" element={<RecuperarSenha />} />
            <Route element={<RequireAuth />}>
              {/* As rotas que precisam de autenticação vem aqui */}
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
