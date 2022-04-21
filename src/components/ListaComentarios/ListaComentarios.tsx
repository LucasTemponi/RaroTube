import React from 'react';
import AdicionarComentario from '../AdicionarComentario/AdicionarComentario';
import Comentario from '../Comentario/Comentario';
import { ComentarioProps } from '../Comentario/ComentarioProps';

export type ListaComentarioProps = {
  comentarios: ComentarioProps[];
};

const ListaComentarios: React.FC<ListaComentarioProps> = ({ comentarios }) => {
  return (
    <div className='flex flex-col space-y-4'>
      <AdicionarComentario />
      {comentarios.map(comentario => {
        return <Comentario {...comentario} />;
      })}
    </div>
  );
};

export default ListaComentarios;
