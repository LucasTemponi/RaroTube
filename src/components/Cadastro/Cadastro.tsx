import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CapeloFbranco from '../../assets/CapeloFbranco';
import apiClient from '../../services/api-client';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const Cadastro: React.FC = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [codigoAcesso, setCodigoAcesso] = useState('');
  const [erroConfirmacao, setErroConfirmacao] = useState('');
  const [erroRequest, setErroRequest] = useState('');
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const awaitToNavigate = () => {
      navigate('/login')
    }

    try {
      if (senha === confirmaSenha) {
        const url = '/auth/cadastrar';
        const response = await apiClient.post(url, { nome, email, senha, codigoAcesso });
        setErroConfirmacao('')
        setSuccess(true)
        setTimeout(() => {
          awaitToNavigate()
        }, 5000);
      } else {
        setErroConfirmacao('As senhas não são iguais.');
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 400) {
        setErroRequest('Esse usuário já existe');
      } else {
        setErroRequest('Erro. Tente novamente mais tarde.');
      }
    }
  }

  return (
    <>

      <div className='min-h-full flex items-center justify-center py-18 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full shadow-lg  px-8 py-16 rounded-lg space-y-8'>
          <div>
            <div className='mx-auto h-12 w-40 flex items-center'>
              <CapeloFbranco />
            </div>
            <h2 className='mt-10 text-center text-2xl font-bold text-raro-cobalto'>
              Cadastro
            </h2>
            {
              success ? (
                <div className='flex flex-col mt-2 justify-center items-center '>
                  <span className="font-sm text-raro-rosa">
                    Cadastro realizado com sucesso!
                  </span>
                  <span className="font-sm text-raro-rosa">Em breve você será redirecionado ao login.</span>
                  <Link to={'/login'}>
                    <span className="flex justify-end font-sm text-raro-oceano">Ir Agora</span>
                  </Link>
                </div>
              ) : <p className='mt-2 text-center text-sm text-gray-600'>
                Preencha os campos e cadastre-se para ter acesso às aulas da sua turma na Raro Academy.
              </p>
            }
          </div>

          <form className='mt-8 space-y-8' onSubmit={handleSubmit}>

            <div className=' rounded-md shadow-sm '>
              <div className='mt-6'>
                <Input
                  type='text'
                  name='nome'
                  label='nome'
                  placeholder='Nome'
                  required
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />
              </div>

              <div>
                <Input
                  type='email'
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
                  placeholder='Senha'
                  required
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                />
              </div>

              <div>
                <Input
                  type='password'
                  name='ConfirmaSenha'
                  label='senha'
                  placeholder='Confirme sua senha'
                  required
                  value={confirmaSenha}
                  onChange={(event) => setConfirmaSenha(event.target.value)}
                />
              </div>

              <div>
                <Input
                  type='text'
                  name='codigoAcesso'
                  label='codigoAcesso'
                  placeholder='Código de Acesso'
                  required
                  value={codigoAcesso}
                  onChange={(event) => setCodigoAcesso(event.target.value)}
                />
              </div>
            </div>
            {
              erroConfirmacao ? (
                <div className='flex items-center justify-end'>
                  <span className="font-sm text-[#FF0000]">
                    {erroConfirmacao}
                  </span>
                </div>
              ) : <></>
            }
            <div className={`flex items-center justify-end h-3 space-6y-px ${erroRequest ? 'visible' : 'invisible'
              }`}>
              <div className='justify-end flex-row'>
                <p className="text-sm text-[#FF0000]">
                  {erroRequest}
                </p>
                <Link to={`/login`}>
                  <a
                    href='#'
                    className='text-sm text-[#4E47C2] hover:text-[#7A75D1]'
                  >
                    Clique aqui para fazer login
                  </a>
                </Link>
              </div>
            </div>
            <div>
              <Button type='submit'>Cadastrar</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


