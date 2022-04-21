export type ComentarioProps = {
  id: string;
  texto: string;
  editado: boolean;
  createdAt: Date;
  aluno: {
    id: string;
    admin: boolean;
    nome: string;
    email: string;
    senha: string;
    foto: string;
  };
  upVotes: number;
  downVotes: number;
};
