import React, { useEffect, useState } from 'react';
import { ComentarioProps } from './ComentarioProps';
import apiClient from '../../services/api-client';
import { useAuthContext } from '../../context/authContext';
import { useComentarios } from '../../hooks/useComentarios';
import { BuscaTimestamps } from '../../helpers/BuscaTimestamps';
import EditarComentario from '../EditarComentario/EditarComentario';
import AdicionarComentario from '../AdicionarComentario/AdicionarComentario';

const Comentario: React.FC<ComentarioProps> = ({
  videoId,
  id,
  texto,
  aluno,
  upVotes,
  downVotes,
  meuVote,
}) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [votes, setVotes] = useState({
    upVotes: upVotes,
    downVotes: downVotes,
  });

  const [editavel, setEditavel] = useState(false);
  const [exclui, setExclui] = useState(false);
  const auth = useAuthContext();
  const setIdEditando = useComentarios(state => state.setIdEditando);
  const idEditando = useComentarios(state => state.idEditando);
  const removeComentario = useComentarios(state => state.removeComentario);
  const textoFormatado = BuscaTimestamps(texto);
  const comentarios = useComentarios(state => state.comentarios);
  const [comentarioAtual, setComentarioAtual] = useState('');

  const responder = useComentarios(state => state.responder);
  const setResponder = useComentarios(state => state.setResponder);

  const acharComentario = () => {
    const achaComentario = comentarios.filter(
      comentario => comentario.id === id
    );
    setComentarioAtual(achaComentario[0].id);
  };

  const handleResponder = () => {
    acharComentario();
    setResponder(!responder);
  };

  function handleEdit() {
    setIdEditando(id);
    acharComentario();
  }

  function handleExcluir() {
    const url = `/videos/${videoId}/comentarios/${id}`;

    try {
      apiClient.delete(url);
      removeComentario(id);
    } catch (error) {
      alert('Erro ao excluir');
    }
  }

  useEffect(() => {
    setEditavel(aluno.id === auth.id);
    setExclui(aluno.id === auth.id);
  }, [aluno, auth]);

  function handleDislike() {
    if (!dislike) {
      try {
        apiClient.put(`/videos/${videoId}/comentarios/${id}/votes`, {
          vote: 'down',
        });
        setDislike(true);
        if (like) {
          setLike(false);
          setVotes({
            downVotes: votes.downVotes + 1,
            upVotes: votes.upVotes - 1,
          });
        } else {
          setVotes({ ...votes, downVotes: votes.downVotes + 1 });
        }
      } catch (e) {
        alert('Erro ao votar');
      }
    } else {
      try {
        apiClient.delete(`/videos/${videoId}/comentarios/${id}/votes`);
        setVotes({ ...votes, downVotes: votes.downVotes - 1 });
        setDislike(!dislike);
      } catch (error) {
        alert('Erro ao deletar');
      }
    }
  }

  function handleLike() {
    if (!like) {
      try {
        apiClient.put(`/videos/${videoId}/comentarios/${id}/votes`, {
          vote: 'up',
        });
        setLike(true);
        setVotes({ ...votes, upVotes: votes.upVotes + 1 });
        if (dislike) {
          setDislike(false);
          setVotes({
            upVotes: votes.upVotes + 1,
            downVotes: votes.downVotes - 1,
          });
        } else {
          setVotes({ ...votes, upVotes: votes.upVotes + 1 });
        }
      } catch (e) {
        alert('Erro ao votar');
      }
    } else {
      try {
        apiClient.delete(`/videos/${videoId}/comentarios/${id}/votes`);
        setVotes({ ...votes, upVotes: votes.upVotes - 1 });
        setLike(!like);
      } catch (error) {
        alert('Erro ao deletar');
      }
    }
  }

  useEffect(() => {
    if (meuVote) {
      meuVote.vote === 'up' ? setLike(true) : setDislike(true);
    }
  }, []);

  return (
    <>
      {idEditando === id && comentarioAtual ? (
        <EditarComentario texto={texto} idComentario={id} />
      ) : (
        <div className='flex max-w-full'>
          <div className='pt-2'>
            <img
              className='h-10 w-10 rounded-full'
              src={aluno.foto}
              alt='Foto do usuário'
            />
          </div>
          <div className='w-full p-2 flex-grow '>
            <p className=' text-justify pl-2 font-semibold dark:text-raro-violeta text-sm leading-4'>
              {aluno.nome}
            </p>
            <div className='mb-2'>
              <p className=' text-justify h-auto resize-y w-full p-2 text-sm leading-normal dark:text-gray-100'>
                {textoFormatado}
              </p>
            </div>
            <div className='flex justify-between space-x-2 pl-2 -mt-2'>
              <div className='space-x-2 pl-2'>
                <button>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-4 w-4 dark:stroke-gray-200 ${
                      like
                        ? 'fill-raro-cobalto dark:fill-gray-200'
                        : 'fill-transparent'
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
                  <span className='leading-normal text-xs dark:text-gray-400'>
                    {votes.upVotes}
                  </span>
                </button>
                <button>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`h-4 w-4 dark:stroke-gray-200 ${
                      dislike
                        ? 'fill-red-700 dark:fill-gray-200'
                        : 'fill-transparent'
                    }`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                    onClick={handleDislike}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5'
                    />
                  </svg>
                  <span className='leading-normal text-xs dark:text-gray-400'>
                    {votes.downVotes}
                  </span>
                </button>
              </div>
              <div className='space-x-2 pr-2'>
                {auth.id && (
                  <button
                    onClick={handleResponder}
                    className={`
                  text-green-400 text-xs
                        `}
                  >
                    Responder
                  </button>
                )}
                {editavel && (
                  <button
                    onClick={handleEdit}
                    className={`
                  text-blue-400 text-xs
                        `}
                  >
                    Editar
                  </button>
                )}
                {exclui && (
                  <button
                    onClick={handleExcluir}
                    className={`
                          text-red-400 text-xs
                        `}
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {responder && comentarioAtual ? (
          <div className='-mt-10'>
            <AdicionarComentario />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Comentario;
