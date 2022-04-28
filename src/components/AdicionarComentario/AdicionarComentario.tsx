import React, { useState } from 'react';
import { useAuthContext } from '../../context/authContext';

const AdicionarComentario: React.FC = () => {
  const [comentario, setComentario] = useState('');
  const authContext = useAuthContext();


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  if (authContext.estaAutenticado()) {
    return (
      <div className='max-w-full flex'>
        <div className='pt-4'>
          <img
            className='rounded-full h-10 w-10'
            src='https://github.com/msb07.png'
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
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
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
                setComentario('');
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <></>
    )
  }
}
export default AdicionarComentario;
