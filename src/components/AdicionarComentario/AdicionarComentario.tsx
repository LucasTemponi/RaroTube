import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { useComentarios } from '../../hooks/useComentarios';
import apiClient from '../../services/api-client';

const AdicionarComentario: React.FC = () => {
  const [texto, setTexto] = useState('');
  const { estaAutenticado, foto } = useAuthContext();
  const { id } = useParams();
  const [mostraBotao, setMostraBotao] = useState(false);

  const addComentario = useComentarios(state => state.addComentarios);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const url = `/videos/${id}/comentarios`;
    const response = await apiClient.post(url, { texto });
    setTexto('');
    addComentario(response.data);
    return response;
  }

  if (estaAutenticado) {
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
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-raro-cobalto peer '
              name='comentario'
              placeholder='Adicione seu  comentário...'
              rows={1}
              value={texto}
              onChange={e => setTexto(e.target.value)}
              onFocus={() => setMostraBotao(true)}
            ></textarea>
          </div>
          <div
            className={`flex-end space-x-3 ${
              mostraBotao ? 'visible' : 'hidden'
            }`}
          >
            <button
              className='px-3 py-2 w-24 text-sm text-blue-100 border border-raro-oceano bg-raro-oceano rounded-md disabled:bg-gray-300 disabled:border-gray-300 transition-all duration-[4000] delay-[4000] ease-out'
              type='submit'
              disabled={!texto}
            >
              Comentar
            </button>
            <button
              className='px-3 py-2 w-24 text-sm text-blue-600 border border-raro-oceano disabled:bg-gray-300 disabled:border-gray-300 disabled:text-blue-100 rounded-md'
              onClick={e => {
                e.preventDefault();
                setTexto('');
              }}
              disabled={!texto}
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
