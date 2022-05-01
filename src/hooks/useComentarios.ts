import create from 'zustand';
import { ComentarioProps } from '../components/Comentario/ComentarioProps';

type ComentariosHookProps = {
  comentarios: ComentarioProps[];
  iniciaComentarios: (comentarios: ComentarioProps[]) => void;
  addComentarios: (comentario: ComentarioProps) => void;
  removeComentario: (id: string) => void;
  atualizaEdicao: (id: string, texto: string) => void;
  editando: boolean;
  setEditando: (param: boolean) => void;
  responder: boolean;
  setResponder: (param: boolean) => void;
};

export const useComentarios = create<ComentariosHookProps>(set => ({
  comentarios: [],
  iniciaComentarios: comentarios => {
    set({ comentarios: comentarios });
  },
  addComentarios: comentario => {
    set(({ comentarios }) => ({ comentarios: [...comentarios, comentario] }));
  },
  removeComentario: id => {
    set(({ comentarios }) => {
      const atualizaComentarios = comentarios.filter(item => item.id !== id);
      return {
        comentarios: atualizaComentarios,
      };
    });
  },
  atualizaEdicao: (id, texto) => {
    set(({ comentarios }) => {
      return {
        comentarios: comentarios.map(item => {
          return item.id === id ? { ...item, texto: texto } : item;
        }),
      };
    });
  },
  editando: false,
  setEditando: param => {
    set({ editando: param });
  },
  responder: false,
  setResponder: param => {
    set({ responder: param });
  },
}));
