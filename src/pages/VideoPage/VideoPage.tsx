import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListaComentarios from '../../components/ListaComentarios/ListaComentarios';
import { VideoList } from '../../components/VideoList/VideoList';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';
import { VideoProps } from '../../components/VideoPlayer/VideoProps';
import { useComentarios } from '../../hooks/useComentarios';
import { useScroll } from '../../hooks/useScroll';
import { useTimestamp } from '../../hooks/useTimestamp';
import { useVideos } from '../../hooks/useVideos';
import apiClient from '../../services/api-client';

const VideoPage = () => {
  const [recomendados, setRecomendados] = useState<VideoProps[]>();
  const [video, setVideo] = useState<VideoProps>();
  const [proximoVideo, setProximoVideo] = useState<VideoProps>();
  const { id } = useParams();
  const comentarios = useComentarios(state => state.comentarios);
  const iniciaComentarios = useComentarios(state => state.iniciaComentarios);

  const containerRefComentarios = useRef<HTMLDivElement | null>(null);
  const paginaComentarios = useScroll(containerRefComentarios);

  const containerRefRecomendados = useRef<HTMLDivElement | null>(null);
  const paginaRecomendados = useScroll(containerRefRecomendados);

  const todosVideos = useVideos(state => state.videos);
  const iniciaVideos = useVideos(state => state.iniciaVideos);

  const timestamp = useTimestamp(state => state.setVideo);

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

    loadVideo();
    loadRecomendados();
    loadComentarios();
    if (!todosVideos.length) {
      apiClient
        .get(
          '/videos?pagina=1&itensPorPagina=100&orderBy=dataPublicacao&orderDirection=DESC'
        )
        .then(response => iniciaVideos(response.data.reverse()));
    }
  }, [id]);

  useEffect(() => {
    const localizaIndexVideo = () => {
      if (todosVideos) {
        console.log(video?.id);
        const videoIndex = todosVideos.findIndex(
          element => element.id === video?.id
        );
        console.log(videoIndex);
        if (videoIndex >= 0) {
          console.log(videoIndex, '>=0');
          setProximoVideo(todosVideos.slice(videoIndex - 1)[0]);
        } else {
          console.log(videoIndex, '<0');
          setProximoVideo(todosVideos.slice(-1)[0]);
        }
      } else {
        console.log('todosVideos não carregado');
      }
    };

    timestamp(document.getElementById('VideoPrincipal') as HTMLVideoElement);
    localizaIndexVideo();
  }, [video, todosVideos]);

  return (
    <>
      <div className=' flex flex-col items-center '>
        <div className=' 2xl:min-w-[80vw] min-w-full max-w-screen-2xl '>
          {video && proximoVideo ? (
            <VideoPlayer
              key={video.id}
              video={video}
              proximoVideo={proximoVideo}
            />
          ) : (
            <video className='w-full h-full' />
          )}
          <div className=' flex flex-row justify-center mt-16 mx-10 '>
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
