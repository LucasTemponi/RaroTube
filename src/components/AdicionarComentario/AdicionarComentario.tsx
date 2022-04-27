import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { useEditar } from '../../hooks/useEditar';
import apiClient from '../../services/api-client';

const AdicionarComentario: React.FC = () => {
  const [texto, setTexto] = useState('');
  const { estaAutenticado, foto } = useAuthContext();
  const { id } = useParams();

  const editando = useEditar(state => state.editando);
  const setEditando = useEditar(state => state.setEditando);
  const idEdit = useEditar(state => state.idEdit);
  const textoEdit = useEditar(state => state.textoEdit);
  const setTextoEdit = useEditar(state => state.setTextoEdit);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editando) {
      const url = `/videos/${id}/comentarios`;
      const response = await apiClient.post(url, { texto });
      setTexto('');
      return response;
    } else {
      const url = `/videos/${id}/comentarios/${idEdit}`;
      const response = await apiClient.patch(url, { texto: textoEdit });
      setTexto('');
      setEditando(false);
      return response;
    }
  }

  if (estaAutenticado()) {
    return (
      <div className='max-w-full flex'>
        <div className='pt-4'>
          <img
            className='rounded-full h-10 w-10'
            src={foto}
            alt='Foto do usuário'
          />
        </div>
        <form action='' className='w-full p-4' onSubmit={handleSubmit}>
          <div className='mb-2'>
            <textarea
              className='w-full p-2 h-10 border border-b-blue-200 rounded focus:outline-none focus:border-blue-600 focus:ring-1 '
              name='comentario'
              placeholder='Adicione seu  comentário...'
              rows={1}
              value={editando ? textoEdit : texto}
              onChange={e =>
                editando
                  ? setTextoEdit(e.target.value)
                  : setTexto(e.target.value)
              }
            ></textarea>
          </div>
          <div className='flex space-x-3'>
            <button
              className='px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded'
              type='submit'
            >
              Comentar
            </button>
            <button
              className='px-3 py-2 text-sm text-blue-600 border border-blue-500 rounded'
              onClick={e => {
                e.preventDefault();
                setTexto('');
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
};
export default AdicionarComentario;
