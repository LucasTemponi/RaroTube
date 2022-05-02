import { useEffect, useRef, useState } from 'react';
import { FavoritosVazio } from '../../components/FavoritosVazio/FavoritosVazio';
import LazyThumbList from '../../components/LazyThumbList/LazyThumbList';
import { VideoList } from '../../components/VideoList/VideoList';

import { useAuthContext } from '../../context/authContext';
import { useFavoritos } from '../../hooks/useFavoritos';
import { useScroll } from '../../hooks/useScroll';
import { useVideos } from '../../hooks/useVideos';

export const PaginaPrincipal = () => {
  const videos = useVideos(state => state.videos);
  const videosCarregados = useVideos(state => state.videosCarregados);
  const iniciaVideos = useVideos(state => state.iniciaVideos);

  const iniciaFavoritos = useFavoritos(state => state.iniciaFavoritos);
  const favoritosCarregados = useFavoritos(state => state.favoritosCarregados);
  const todosFavoritos = useFavoritos(state => state.favoritos);

  const [carregando, setCarregando] = useState<boolean>(true);
  const authContext = useAuthContext();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pagina = useScroll(containerRef);

  const loadVideos = async () => {
    if (authContext.estaAutenticado) {
      iniciaFavoritos();
      iniciaVideos();
    } else {
      iniciaVideos();
    }
  };

  useEffect(() => {
    if (!videosCarregados || !favoritosCarregados) {
      loadVideos();
    } else {
      setCarregando(false);
      loadVideos();
    }
  }, [authContext.estaAutenticado]);

  useEffect(() => {
    if (authContext.estaAutenticado) {
      if (videosCarregados && favoritosCarregados) {
        setCarregando(false);
      }
    } else {
      if (videosCarregados) {
        setCarregando(false);
      }
    }
  }, [videosCarregados, favoritosCarregados]);

  return (
    <section className=' mt-2 max-w-[95vw] lg:max-w-[85vw] mx-auto'>
      {authContext.estaAutenticado && (
        <article className=' mb-10 pt-10 md:pt-4'>
          <h1 className=' font-extrabold underline decoration-raro-rosa md:text-3xl xl:text-4xl my-2 py-4 text-left text-raro-cobalto dark:text-raro-violeta'>
            Vídeos favoritos
          </h1>
          {carregando ? (
            <LazyThumbList items={5} />
          ) : todosFavoritos.length === 0 ? (
            <FavoritosVazio />
          ) : (
            <VideoList hover videos={todosFavoritos} />
          )}
        </article>
      )}
      <article className=' mb-10 pt-8 md:pt-4 '>
        <h1 className=' font-extrabold underline decoration-raro-rosa text-xl md:text-3xl lg:text-4xl my-2 py-4 text-left text-raro-cobalto dark:text-raro-violeta'>
          Adicionados recentemente
        </h1>
        {carregando ? (
          <LazyThumbList items={20} />
        ) : (
          <VideoList hover videos={videos?.slice(0, pagina * 15)} />
        )}
      </article>
      <div ref={containerRef} className='h-10 ' />
    </section>
  );
};
