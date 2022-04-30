import { useEffect, useRef, useState } from 'react';
import { VideoList } from '../../components/VideoList/VideoList';
import { VideoProps } from '../../components/VideoPlayer/VideoProps';

import { useAuthContext } from '../../context/authContext';
import { useFavoritos } from '../../hooks/useFavoritos';
import { useScroll } from '../../hooks/useScroll';
import { useVideos } from '../../hooks/useVideos';

import apiClient from '../../services/api-client';
import { LazyPrincipal } from './LazyPagina';

export const PaginaPrincipal = () => {
  // const VideoList = lazy(()=>import('../../components/VideoList/VideoList'));

  // const [videos, setVideos] = useState<VideoProps[]>();
  const videos = useVideos(state => state.videos);
  const iniciaVideos = useVideos(state => state.iniciaVideos);
  const [recomendados, setRecomendados] = useState<VideoProps[]>();
  const [carregando, setCarregando] = useState<boolean>(true);
  const authContext = useAuthContext();

  const iniciaFavoritos = useFavoritos(state => state.iniciaFavoritos);
  const todosFavoritos = useFavoritos(state => state.favoritos);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pagina = useScroll(containerRef);

  const loadVideos = async () => {
    try {
      if (authContext.estaAutenticado) {
        console.log('autenticado');
        await apiClient
          .get('/videos/favoritos')
          .then(response => iniciaFavoritos(response.data));
        await apiClient
          .get(
            '/videos?pagina=1&itensPorPagina=100&orderBy=dataPublicacao&orderDirection=DESC'
          )
          .then(response => iniciaVideos(response.data));
      } else {
        console.log('não autenticado');
        await apiClient
          .get(
            '/videos?pagina=1&itensPorPagina=100&orderBy=dataPublicacao&orderDirection=DESC'
          )
          .then(response => iniciaVideos(response.data));
      }
      setCarregando(false);
    } catch (e) {
      alert('Estamos com problemas no momento, tente novamente mais tarde');
    }
  };

  useEffect(() => {
    if (videos.length === 0 || todosFavoritos.length === 0) {
      loadVideos();
    } else {
      setCarregando(false);
      loadVideos();
    }
  }, [authContext.estaAutenticado]);

  return carregando ? (
    <LazyPrincipal />
  ) : (
    <>
      <div className=' my-auto 4xl:max-w-[70vw] xl:max-w-[80vw] lg:w-[85vw] md:w-[90vw] sm:w-[95vw] m-auto'>
        {authContext.estaAutenticado && (
          <>
            <h1 className=' font-extrabold underline decoration-raro-rosa text-2xl ml-7 py-4 text-left text-raro-cobalto'>
              Vídeos favoritos
            </h1>
            <VideoList hover videos={todosFavoritos} />
          </>
        )}
        <h1 className=' font-extrabold underline decoration-raro-rosa text-2xl  ml-7 py-4 text-left text-raro-cobalto'>
          Adicionados recentemente
        </h1>
        <VideoList hover videos={videos?.slice(0, pagina * 10)} />

        <div ref={containerRef} className='h-10' />
      </div>
    </>
  );
};
