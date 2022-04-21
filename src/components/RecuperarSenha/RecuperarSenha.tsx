import { useState } from "react";
import CapeloFbranco from "../../assets/CapeloFbranco";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";


export const RecuperarSenha = () => {
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const alterarSenha = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Código para alterar senha
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full shadow-lg  px-8 py-20 rounded-lg space-y-8">
      <div>
            <div className='mx-auto h-14 w-40 flex items-center'>
              <CapeloFbranco />
            </div>
            <h2 className='mt-8 text-center text-2xl font-bold text-raro-cobalto'>Alterar senha</h2>
            <p className=' mt-2 text-center text-sm text-gray-600'>
              Insira o código recebido por email e elabore a nova senha </p>
          </div>
       
        <form className="mt-8 space-y-6" action="#" onSubmit={alterarSenha}>
          <div className=" rounded-md shadow-sm -space-6y-px  ">
            <div>
              <Input
                name='codigo'
                label='Código de Recuperação'
                placeholder='Código de Recuperação'
                type='text'
                value={codigo}
                onChange={event => {
                  setCodigo(event.target.value);
                }}
              />
            </div>

            <div>
              <Input
                name='NovaSenha'
                label='Nova Senha'
                placeholder='Nova Senha'
                type='text'
                value={novaSenha}
                onChange={event => {
                  setNovaSenha(event.target.value);
                }}
              />
            </div>

            <div>
              <Input
                name='confirmarSenha'
                label='Confirmar Senha'
                placeholder='Confirmar Senha'
                type='text'
                value={confirmarSenha}
                onChange={event => {
                  setConfirmarSenha(event.target.value);
                }}
              />
            </div>
          </div>
          <Button type="submit">Alterar</Button>
        </form>
      </div>
    </div>
  );
};
