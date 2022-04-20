import React, { useState } from 'react';

const AdicionarComentario: React.FC = () => {
  const [comentario, setComentario] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

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
            className='w-full p-2 h-10 border border-b-blue-200 rounded focus:outline-none focus:border-blue-600 focus:ring-1 '
            name='comentario'
            placeholder='Adicione seu  comentário...'
            rows={1}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
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
};

export default AdicionarComentario;
