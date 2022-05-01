import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { useComentarios } from '../../hooks/useComentarios';
import apiClient from '../../services/api-client';

type EditarComentarioProps = {
  texto: string;
  idComentario: string;
};

const EditarComentario: React.FC<EditarComentarioProps> = ({
  texto,
  idComentario,
}) => {
  const [textoEdit, setTextoEdit] = useState(texto);
  const { foto } = useAuthContext();
  const { id } = useParams();
  const atualizaEdicao = useComentarios(state => state.atualizaEdicao);
  const setEditando = useComentarios(state => state.setEditando);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `/videos/${id}/comentarios/${idComentario}`;
    await apiClient.patch(url, { texto: textoEdit });
    setTextoEdit('');
    atualizaEdicao(idComentario, textoEdit);
    setEditando(false);
  };

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
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-raro-cobalto peer '
            name='comentario'
            placeholder='Adicione seu  comentário...'
            rows={1}
            value={textoEdit}
            onChange={e => setTextoEdit(e.target.value)}
          ></textarea>
        </div>
        <div className='flex-end space-x-3'>
          <button
            className='px-3 py-2 text-sm text-blue-100 bg-raro-oceano rounded-md disabled:bg-gray-300 disabled:border-gray-300'
            type='submit'
            disabled={!textoEdit}
          >
            Comentar
          </button>
          <button
            className='px-3 py-2 text-sm text-blue-600 border border-raro-oceano rounded-md disabled:bg-gray-300 disabled:border-gray-300 disabled:text-blue-100'
            onClick={e => {
              e.preventDefault();
              setTextoEdit('');
            }}
            disabled={!textoEdit}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarComentario;
