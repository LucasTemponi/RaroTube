import { useState } from "react";
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"

export const CodigoDeRecuperarSenha = () => {
  const [codigo, setCodigo] = useState("");

  const codigoDeRecuperarSenha = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-500">Solicitar código de recuperação de senha</h2>
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
            <Button type="submit">Codigo de recuperar senha</Button>
          </form>
        </div>
      </div>
    </>

  )
}
