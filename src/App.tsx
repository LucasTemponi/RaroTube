import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CodigoDeRecuperarSenha } from './components/CodigoDeRecuperarSenha/CodigoDeRecuperarSenha';
import { Layout } from './components/Layout/Layout';
import { RecuperarSenha } from './components/RecuperarSenha/RecuperarSenha';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { AuthContextProvider } from './context/authContext';
import { ThemeProvider } from './context/ThemeContext';
import { CadastroPage } from './pages/CadastroPage/CadastroPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { PaginaNaoEncontrada } from './pages/PaginaNaoEncontrada/PaginaNaoEncontrada';
import { PaginaPrincipal } from './pages/PaginaPrincipal/PaginaPrincipal';
import VideoPage from './pages/VideoPage/VideoPage';

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider initialTheme='dark'>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/cadastro' element={<CadastroPage />} />
            <Route
              path='/solicitarcodigo'
              element={<CodigoDeRecuperarSenha />}
            />
            <Route path='/alterarsenha' element={<RecuperarSenha />} />
            <Route path='/' element={<Layout />}>
              <Route index element={<PaginaPrincipal />} />
              <Route path='/video/:id' element={<VideoPage />} />
              <Route element={<RequireAuth />}>
                {/* As rotas que precisam de autenticação vem aqui */}
              </Route>
            </Route>
            <Route path='*' element={<PaginaNaoEncontrada />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
