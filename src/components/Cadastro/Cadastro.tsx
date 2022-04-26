import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CapeloFbranco from '../../assets/CapeloFbranco';
import apiClient from '../../services/api-client';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [codigoAcesso, setCodigoAcesso] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = '/auth/cadastrar';
    const response = await apiClient.post(url, {nome, email, senha, codigoAcesso});
    console.log(response.data)
  }

  return (
    <>
      <div className='min-h-full flex items-center justify-center py-18 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full shadow-lg  px-8 py-16 rounded-lg space-y-8'>
          <div>
            <div className='mx-auto h-12 w-40 flex items-center'>
              <CapeloFbranco />
            </div>
            <h2 className='mt-6 text-center text-3xl font-bold text-raro-cobalto'>
              Cadastro
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Preencha os campos abaixo para se cadastrar na plataforma
            </p>
          </div>

          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <div className=' rounded-md shadow-sm -space-6y-px  '>
              <div>
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

            {/* <div>
              <Input
                type='password'
                name='senha'
                label='senha'
                placeholder='Senha'
                required
                value={confirmaSenha}
                onChange={(event) => setConfirmaSenha(event.target.value)}
              />
            </div> */}

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

            {/* <div className='flex items-center justify-end'>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-[#4E47C2] hover:text-[#7A75D1]'
                >
                  Não possui o Código de acesso? Clique aqui e Solicite.
                </a>
              </div>
            </div> */}

            <div>
              <Button type='submit'>Cadastrar</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
