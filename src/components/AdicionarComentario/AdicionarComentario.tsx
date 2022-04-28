import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { useComentarios } from '../../hooks/useComentarios';
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
  const addComentario = useComentarios(state => state.addComentarios);
  const atualizaEdicao = useComentarios(state => state.atualizaEdicao);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editando) {
      const url = `/videos/${id}/comentarios`;
      const response = await apiClient.post(url, { texto });
      setTexto('');
      addComentario(response.data);
      return response;
    } else {
      const url = `/videos/${id}/comentarios/${idEdit}`;
      const response = await apiClient.patch(url, { texto: textoEdit });
      setTexto('');
      setEditando(false);
      atualizaEdicao(idEdit, textoEdit);
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
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-raro-cobalto dark:focus:border-raro-cobalto focus:outline-none focus:ring-0 focus:border-raro-cobalto peer '
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
          <div className='flex-end space-x-3'>
            <button
              className='px-3 py-2 text-sm text-blue-100 bg-raro-oceano rounded-md'
              type='submit'
            >
              Comentar
            </button>
            <button
              className='px-3 py-2 text-sm text-blue-600 border border-raro-oceano rounded-md'
              onClick={(e) => {
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
