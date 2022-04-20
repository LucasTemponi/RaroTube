import axios from "axios";
import { useState } from "react";
import { Cadastro } from "../../components/Cadastro/Cadastro";
import { UsuarioProps } from "../../components/Cadastro/UsuarioProps";

export const CadastroPage = () => {

    const [usuario, setUsuario] = useState<UsuarioProps>();

    const handleSubmit = async (usuario: UsuarioProps) => {
        const response = await axios.post('https://3.221.159.196:3320/auth/cadastrar',
            {
                'nome': usuario.nome,
                'email': usuario.email,
                'senha': usuario.senha,
                'codigo': usuario.turma.id
            }
        );
        setUsuario(response.data)
    }
    //navigate('/videos')

    return (
        <>
            <div className="items-center justify-center m-10">
                <Cadastro
                    usuario={usuario}
                    onSubmit={handleSubmit} />
            </div>
        </>
    );


}

