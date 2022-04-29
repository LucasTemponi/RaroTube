export type RecuperaSenhaProps = {
  id: string;
  codigo: string;
  utilizado: boolean;
  aluno: {
    id: string;
    admin: boolean;
    nome: string;
    email: string;
    senha: string;
    foto: string;
  };
};
