import React, { memo } from 'react';
import AdicionarComentario from '../AdicionarComentario/AdicionarComentario';
import Comentario from '../Comentario/Comentario';
import { ComentarioProps } from '../Comentario/ComentarioProps';

export type ListaComentarioProps = {
  videoId: string | undefined;
  comentarios: ComentarioProps[];
};

const ListaComentarios: React.FC<ListaComentarioProps> = ({
  comentarios,
  videoId,
}) => {
  return (
    <div className='flex flex-col space-y-4'>
      <AdicionarComentario />
      {comentarios.map(comentario => {
        return (
          <Comentario key={comentario.id} {...comentario} videoId={videoId} />
        );
      })}
    </div>
  );
};

export default memo(ListaComentarios);
