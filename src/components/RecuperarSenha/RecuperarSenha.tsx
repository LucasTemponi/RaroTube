import { useState } from "react"
import { Button } from "../Button"
import { Input } from "../Input"

export const RecuperarSenha = () => {
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const alterarSenha = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Código para alterar senha
  }

  return (
    <>
      <form action="#" onSubmit={alterarSenha}>
        <div>
          <Input
            name="codigo"
            label="Código de Recuperação"
            placeholder="Código de Recuperação"
            type="text"
            value={codigo}
            onChange={(event) => { setCodigo(event.target.value) }}
          />
        </div>

        <div>
          <Input
            name="NovaSenha"
            label="Nova Senha"
            placeholder="Nova Senha"
            type="text"
            value={novaSenha}
            onChange={(event) => { setNovaSenha(event.target.value) }}
          />
        </div>

        <div>
          <Input name="confirmarSenha"
            label="Confirmar Senha"
            placeholder="Confirmar Senha"
            type="text"
            value={confirmarSenha}
            onChange={(event) => { setConfirmarSenha(event.target.value) }}
          />
        </div>
        <Button type="submit">Alterar senha</Button>
      </form>
    </>
  )

}