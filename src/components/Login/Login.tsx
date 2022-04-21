
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CapeloFbranco from '../../assets/CapeloFbranco';
import apiClient from '../../services/api-client';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('')
  const navigate = useNavigate();

  async function autenticaUsuario(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro('');


    try {
      const url = '/auth/login';
      const response = await apiClient.post(url,
        { email, senha }
      );

      const { access_token, id } = response.data;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("id", id);
        navigate("/");
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
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full shadow-lg  px-8 py-16 rounded-lg space-y-8'>
          <div>
          <div className='mx-auto h-12 w-40 flex items-center'> 
            <CapeloFbranco/>
            </div>
            <h2 className='mt-6 text-center text-2xl font-bold text-raro-cobalto'>
              Faça Login em sua conta
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Ou{' '}
              <Link to = {`/cadastro`}>
              <a
                href='#'
                className='font-medium text-[#4E47C2] hover:text-[#7A75D1]'
              >
                Clique aqui e faça seu cadastro.
              </a>
              </Link>
            </p>
          </div>

          <form className='mt-8 space-y-6' onSubmit={autenticaUsuario}>
            <div className=' rounded-md shadow-sm -space-6y-px  '>
              <div>
                <Input
                  type='text'
                  name='email'
                  label='email'
                  placeholder='email'
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div>
                <Input
                  type='password'
                  name='senha'
                  label='senha'
                  placeholder='senha'
                  required
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                />
              </div>
            </div>

            {
              erro ? (
                <div className='flex items-center justify-end'>
                  <div className='text-sm'>
                    <span className="font-small text-[#FF0000]">
                      {erro}
                    </span>
                  </div>
                </div>
              ) : <></>
            }

            <div className='flex items-center justify-end'>
              <div className='text-sm'>
              <Link to = {`/solicitarcodigo`}>
                <a
                  href='#'
                  className='font-medium text-[#4E47C2] hover:text-[#7A75D1]'
                >
                  Esqueceu sua senha?
                </a>
                </Link>
              </div>
            </div>

            <div>
              <Button type='submit'>Entrar</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

