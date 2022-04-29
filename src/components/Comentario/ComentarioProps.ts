export type ComentarioProps = {
  videoId: string | undefined
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
  meuVote?: {
    vote: string,
  }
  upVotes: number;
  downVotes: number;
};
