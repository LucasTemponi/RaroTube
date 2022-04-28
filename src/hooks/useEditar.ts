import create from 'zustand';

type EditarProps = {
  editando: boolean;
  setEditando: (param: boolean) => void;
  idEdit: string;
  setIdEdit: (param: string) => void;
  textoEdit: string;
  setTextoEdit: (param: string) => void;
};

export const useEditar = create<EditarProps>(set => ({
  editando: false,
  setEditando: param => {
    set({ editando: param });
  },
  idEdit: '',
  setIdEdit: param => {
    set({ idEdit: param });
  },
  textoEdit: '',
  setTextoEdit: param => {
    set({ textoEdit: param });
  },
}));
