import { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

type loginProps = {
  onLogin: (email: string, senha: string) => void;
  erro?: string;
};

export const Login = (props: loginProps) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function autenticaUsuario(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
   props.onLogin(email, senha);

  }

  return (
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
              alt='Workflow'
            />
            <h2 className='mt-6 text-center text-3xl font-bold text-gray-500'>
              Faça Login em sua conta
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Ou{' '}
              <a
                href='#'
                className='font-medium text-[#4E47C2] hover:text-[#7A75D1]'
              >
                Clique aqui e faça seu cadastro.
              </a>
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
              props.erro ? (
                <div className='flex items-center justify-end'>
                  <div className='text-sm'>
                    <span className="font-small text-[#FF0000]">
                      {props.erro}
                    </span>
                  </div>
                </div>
              ) : <></>
            }

            <div className='flex items-center justify-end'>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-[#4E47C2] hover:text-[#7A75D1]'
                >
                  Esqueceu sua senha?
                </a>
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

