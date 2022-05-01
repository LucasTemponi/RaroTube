import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import LazyThumbList from '../../components/LazyThumbList/LazyThumbList';
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
  const [carregando,setCarregando] = useState<boolean>(true);
  const [proximoVideo, setProximoVideo] = useState<VideoProps>();
  const { id } = useParams();
  const comentarios = useComentarios(state => state.comentarios);
  const iniciaComentarios = useComentarios(state => state.iniciaComentarios);

  const containerRefComentarios = useRef<HTMLDivElement | null>(null);
  const paginaComentarios = useScroll(containerRefComentarios);

  const containerRefRecomendados = useRef<HTMLDivElement | null>(null);
  const paginaRecomendados = useScroll(containerRefRecomendados);

  const todosVideos = useVideos(state => state.videos);
  const videosCarregados = useVideos(state => state.videosCarregados);
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
      console.log(response.data);
      iniciaComentarios(response.data);
    };
    console.log('useEffect id')
    loadVideo();
    loadRecomendados();
    loadComentarios();
    if (!videosCarregados) {
      iniciaVideos();
    }
    setCarregando(false);
  }, [id]);

  useEffect(() => {

    const buscaProximoVideo = () => {
      if (videosCarregados) {
        console.log(video?.id);
        const videoIndex = todosVideos.findIndex(
          element => element.id === video?.id
        );
        console.log(videoIndex);
        if (videoIndex >= 0) {
          setProximoVideo(todosVideos.slice(videoIndex - 1)[0]);
        } else {
          setProximoVideo(todosVideos.slice(-1)[0]);
        }
      } else {
        console.log('todosVideos não carregado');
      }
    };
    console.log('useEffect video,videoCarregados')
    buscaProximoVideo();
    
  }, [video,videosCarregados]);

  useEffect(() => {
    console.log('useEffect video, proximoVideo')
    timestamp(document.getElementById('VideoPrincipal') as HTMLVideoElement);
    console.log('Teste',document.getElementById('VideoPrincipal'))
  },[proximoVideo])

  return (
    <>
      <div className=' flex flex-col items-center '>
        <div className=' w-full max-w-screen-2xl '>
          {video && proximoVideo ? (
            <VideoPlayer
              key={video.id}
              video={video}
              proximoVideo={proximoVideo}
            />
          ) : (
            <div className='mx-auto w-full aspect-video max-h-[80vh] bg-gradient-to-b from-black to-gray-800 ' />
          )}
          <div className=' flex flex-col sm:flex-row justify-center mt-16 sm:mx-10 '>
            <div className=' sm:w-3/4 '>
              {comentarios && (
                <ListaComentarios
                  videoId={video?.id}
                  comentarios={comentarios?.slice(0, paginaComentarios * 10)}
                />
              )}
              <div ref={containerRefComentarios} className='h-10'></div>
            </div>
            <div className=' m-auto sm:ml-8'>
              {video && proximoVideo ? (
                <VideoList
                  videos={recomendados?.slice(0, paginaRecomendados * 10)}
                  vertical
                />
              ) : (<LazyThumbList items={10} vertical />)}
                <div ref={containerRefRecomendados} className='h-10'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
