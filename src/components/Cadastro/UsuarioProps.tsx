export type UsuarioProps = {
    nome: string,
    email: string,
    senha: string,
    foto?: string,
    turma: {
        id: string,
        nome: string,
        descricao: string
    },
    id: string,
    admin?: false
}