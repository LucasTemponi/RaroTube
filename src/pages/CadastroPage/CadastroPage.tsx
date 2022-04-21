import axios from "axios";
import { useState } from "react";
import { Cadastro } from "../../components/Cadastro/Cadastro";
import { UsuarioProps } from "../../components/Cadastro/UsuarioProps";

export const CadastroPage = () => {

    const [usuario, setUsuario] = useState<UsuarioProps>();
    //const navigate = useNavigate();


    const handleSubmit = async (usuario: UsuarioProps) => {

        try {
            const response = await axios.post('https://3.221.159.196:3320/auth/cadastrar',
                {
                    'nome': usuario.nome,
                    'email': usuario.email,
                    'senha': usuario.senha,
                    'codigo': usuario.turma.id
                }
            );
            setUsuario(response.data)
            //navigate('/videos')

        } catch (error: any) {
            if (error.response.data.statusCode === 400) {
                alert('Esse usuário já está cadastrado, siga para a página de Login.');
            } else {
                alert('Erro. Tente novamente mais tarde.');
            }
        }
    }


    return (
        <>
            <div className="items-center justify-center m-10">
                <Cadastro
                    usuario={usuario}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );


}

