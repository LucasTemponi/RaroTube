import React, { useState } from 'react';
import { text } from 'stream/consumers';
import { ComentarioProps } from './ComentarioProps';

const Comentario: React.FC<ComentarioProps> = ({
  texto,
  aluno,
  upVotes,
  downVotes,
}) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  function handleDislike() {
    setDislike(!dislike);
    if (like) {
      setLike(false);
    }
  }

  function handleLike() {
    setLike(!like);
    if (dislike) {
      setDislike(false);
    }
  }

  return (
    <div className='flex max-w-full'>
      <div className='pt-2'>
        <img
          className='h-10 w-10 rounded-full'
          src={aluno.foto}
          alt='Foto do usuário'
        />
      </div>
      <div className='w-full p-2 flex-grow'>
        <p className='pl-2 font-semibold text-sm leading-4'>{aluno.nome}</p>
        <div className='mb-2'>
          <p className='h-auto resize-y w-full p-2 text-sm leading-normal'>
            {texto}
          </p>
        </div>
        <div className='flex space-x-2 pl-2 -mt-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-4 w-4 ${
              like ? 'fill-raro-oceano' : 'fill-transparent'
            }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
            onClick={handleLike}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
            />
          </svg>
          <span className='leading-normal text-xs'>{upVotes}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-4 w-4 ${
              dislike ? 'fill-red-700' : 'fill-transparent'
            }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            stroke-width='2'
            onClick={handleDislike}
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5'
            />
          </svg>
          <span className='leading-normal text-xs'>{downVotes}</span>
        </div>
      </div>
    </div>
  );
};

export default Comentario;