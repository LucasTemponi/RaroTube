import { useState } from 'react';
import CapeloFbranco from '../../assets/CapeloFbranco';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import apiClient from '../../services/api-client';
import { Link } from 'react-router-dom';
import { RecuperaSenhaProps } from './RecuperarSenhaProps';

export const CodigoDeRecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');

  const codigoDeRecuperarSenha = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setErro('');
    try {
      await apiClient.post('/auth/solicitar-codigo', { email });
      const response = await apiClient.get<RecuperaSenhaProps[]>(
        '/auth/codigos'
      );
      const codigo = response.data.filter(aluno => {
        return aluno.aluno.email === email;
      });
      alert(`Seu código de recuperação é ${codigo[codigo.length - 1].codigo}`);
    } catch (error) {
      setErro('Erro ao solicitar código de recuperação');
    }
  };

  return (
    <>
      <div className='min-h-full flex flex-col items-center justify-center space-y-3 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full shadow-lg  px-8 py-20 rounded-lg space-y-8 '>
          <div>
            <div className='mx-auto h-14 w-40 flex items-center'>
              <CapeloFbranco />
            </div>
            <h2 className='mt-8 text-center text-2xl font-bold text-raro-cobalto'>
              Esqueci minha senha
            </h2>
            <p className=' mt-2 text-center text-sm text-gray-600'>
              Insira seu email no campo abaixo para receber o código de
              recuperação{' '}
            </p>
          </div>
          <form
            className='mt-8 space-y-6'
            action='#'
            onSubmit={codigoDeRecuperarSenha}
          >
            <div className=' rounded-md shadow-sm -space-6y-px  '>
              <div>
                <Input
                  type='email'
                  name='email'
                  label='email'
                  placeholder='email'
                  required
                  value={email}
                  onChange={event => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className='flex items-center justify-end'>
              <div className='text-sm'>
                <Link
                  className='font-medium text-[#4E47C2] hover:text-raro-rosa'
                  to={`/alterarsenha`}
                >
                  Recebi o código e gostaria de prosseguir
                </Link>
              </div>
            </div>
            <Button type='submit'>Enviar Código</Button>
          </form>
        </div>
        <div
          className={`flex items-center justify-end h-5 ${
            erro ? 'visible' : 'invvisible'
          }`}
        >
          <span className='font-small text-sm text-[#FF0000]'>{erro}</span>
        </div>
      </div>
    </>
  );
};
