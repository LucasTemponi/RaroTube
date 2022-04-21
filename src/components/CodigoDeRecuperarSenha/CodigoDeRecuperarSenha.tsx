import { useState } from "react";
import CapeloFbranco from "../../assets/CapeloFbranco";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

export const CodigoDeRecuperarSenha = () => {
  const [codigo, setCodigo] = useState("");

  const codigoDeRecuperarSenha = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full shadow-lg  px-8 py-20 rounded-lg space-y-8 ">
          <div>
            <div className='mx-auto h-14 w-40 flex items-center'>
              <CapeloFbranco />
            </div>
            <h2 className='mt-8 text-center text-2xl font-bold text-raro-cobalto'>Esqueci minha senha</h2>
            <p className=' mt-2 text-center text-sm text-gray-600'>
              Insira seu email no campo abaixo para receber o código de recuperação </p>
          </div>
          <form className="mt-8 space-y-6" action="#" onSubmit={codigoDeRecuperarSenha}>
            <div className=" rounded-md shadow-sm -space-6y-px  ">
              <div>
                <Input
                  type="email"
                  name="email"
                  label="email"
                  placeholder="email"
                  required
                  value={codigo}
                  onChange={(event) => { setCodigo(event.target.value) }}
                />
              </div>
            </div>
            <Button type="submit">Enviar Código</Button>
          </form>
        </div>
      </div>
    </>

  )
}
