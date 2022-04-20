import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { UsuarioProps } from './UsuarioProps';

type CadastroProps = {
  usuario?: UsuarioProps;
  onSubmit?: (usuario: UsuarioProps) => void;
}

export const Cadastro: React.FC<CadastroProps> = ({
  usuario,
  onSubmit,
}) => {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [turma, setTurma] = useState("");

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
      setSenha(usuario.senha);
      setTurma(usuario.turma.id)
    }
  }, [usuario]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      const novoUsuario = {
        ...usuario,
        nome,
        email,
        senha,
        turma
      };
      onSubmit(novoUsuario as unknown as UsuarioProps);
    }
    //navigate('/artigos')
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
              Cadastre-se
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
                  type='text'
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

            <div>
              <Input
                type='text'
                name='codigoAcesso'
                label='codigoAcesso'
                placeholder='Código de Acesso'
                required
                value={turma}
                onChange={(event) => setTurma(event.target.value)}
              />
            </div>

            <div className='flex items-center justify-end'>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-[#4E47C2] hover:text-[#7A75D1]'
                >
                  Não possui o Código de acesso? Clique aqui e Solicite.
                </a>
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
};
