import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ComentarioProps } from '../../components/Comentario/ComentarioProps';
import ListaComentarios from '../../components/ListaComentarios/ListaComentarios';
import Navbar from '../../components/Navbar/Navbar';
import { VideoList } from '../../components/VideoList/VideoList';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';
import { videoProps } from '../../components/VideoPlayer/VideoProps';
import apiClient from '../../services/api-client';

const VideoPage = () => {
  const [recomendados, setRecomendados] = useState<videoProps[]>();
  const [video, setVideo] = useState<videoProps>();
  const [comentarios, setComentarios] = useState<ComentarioProps[]>();
  const { id } = useParams();

  useEffect(() => {
    const loadRecomendados = async () => {
      const response = await apiClient.get(`/videos/${id}/recomendacoes`);
      setRecomendados(response.data);
    };

    const loadVideo = async () => {
      const response = await apiClient.get(`/videos/${id}`);
      setVideo(response.data);
    };

    const loadComentarios = async () => {
      const response = await apiClient.get(`/videos/${id}/comentarios`);
      setComentarios(response.data);
    };
    loadRecomendados();
    loadVideo();
    loadComentarios();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className='grid grid-cols-4 gap-4 mx-6 mt-10 p-6'>
        <div className='col-span-3'>
          {video && <VideoPlayer {...video} />}
          <div className='mt-16'>
            {comentarios && <ListaComentarios comentarios={comentarios} />}
          </div>
        </div>
        <div>
          <p>Relacionados</p>
          <div className='mx-auto'>
            <VideoList videos={recomendados} vertical={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
