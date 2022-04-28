import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListaComentarios from '../../components/ListaComentarios/ListaComentarios';
import { VideoList } from '../../components/VideoList/VideoList';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';
import { videoProps } from '../../components/VideoPlayer/VideoProps';
import { useComentarios } from '../../hooks/useComentarios';
import { useScroll } from '../../hooks/useScroll';
import apiClient from '../../services/api-client';

const VideoPage = () => {

  const [recomendados, setRecomendados] = useState<videoProps[]>();
  const [video, setVideo] = useState<videoProps>();
  const { id } = useParams();
  const comentarios = useComentarios(state => state.comentarios);
  const iniciaComentarios = useComentarios(state => state.iniciaComentarios);

  const containerRefComentarios = useRef<HTMLDivElement | null>(null);
  const paginaComentarios = useScroll(containerRefComentarios);

  const containerRefRecomendados = useRef<HTMLDivElement | null>(null);
  const paginaRecomendados = useScroll(containerRefRecomendados);

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
      iniciaComentarios(response.data);
    };
    loadRecomendados();
    loadVideo();
    loadComentarios();
  }, [id]);

  return (
    <>
      <div className=' flex flex-col items-center '>
        <div className=' 2xl:min-w-[80vw] md:min-w-full max-w-screen-2xl '>
          {video && <VideoPlayer {...video} />}
          <div className=' flex flex-row justify-between mt-16 mx-8 '>
            <div className=' w-3/4 '>
              {comentarios && (
                <ListaComentarios
                  videoId={video?.id}
                  comentarios={comentarios?.slice(0, paginaComentarios * 10)}
                />
              )}
              <div ref={containerRefComentarios} className='h-10'></div>
            </div>
            <div className='w-1/4'>
              <VideoList
                videos={recomendados?.slice(0, paginaRecomendados * 10)}
                vertical
              />
              <div ref={containerRefRecomendados} className='h-10'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
