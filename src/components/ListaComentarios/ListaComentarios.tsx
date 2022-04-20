import React from 'react';
import AdicionarComentario from '../AdicionarComentario/AdicionarComentario';
import Comentario from '../Comentario/Comentario';

export type TesteProps = {
  usuario: string;
  comentario: string;
  id: number;
};

const ListaComentarios = () => {
  const teste: TesteProps[] = [
    {
      usuario: 'Mauricio',
      comentario: 'Ótimo',
      id: 1,
    },
    {
      usuario: 'Cassia',
      comentario: 'Gostei',
      id: 2,
    },
    {
      usuario: 'Lucas',
      comentario: 'Demais',
      id: 3,
    },
    {
      usuario: 'Laysa',
      comentario: 'Muito bom',
      id: 4,
    },
  ];
  return (
    <div className='flex flex-col space-y-4'>
      <AdicionarComentario />
      {teste.map(item => {
        return <Comentario {...item} />;
      })}
    </div>
  );
};

export default ListaComentarios;
