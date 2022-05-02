import React, { useMemo, useRef, useState } from 'react';
import { useFavoritos } from '../../hooks/useFavoritos';
import { thumbnailProps } from './ThumbnailProps';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { Estrelinha } from '../Estrelinha/Estrelinha';

export const Thumbnail: React.FC<thumbnailProps> = props => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [favorite, setFavorite] = useState(false);

  const todosFavoritos = useFavoritos(state => state.favoritos);
  const adicionaFavorito = useFavoritos(state => state.adicionaFavorito);
  const removeFavorito = useFavoritos(state => state.removeFavorito);

  let debounceId = useRef(0);

  const navigate = useNavigate();
  const authContext = useAuthContext();

  const playVideo = () => {
    debounceId.current = window.setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        videoRef.current.controls = false;
      }
    }, 340);
  };

  const pauseVideo = () => {
    clearTimeout(debounceId.current);
    if (videoRef.current) {
      videoRef.current?.pause();
      videoRef.current.controls = false;
    }
  };

  const enterVideo = (event: React.MouseEvent) => {
    navigate(`/video/${props.video.id}/`);
  };

  const favoriteVideo = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (favorite) {
      removeFavorito(props.video);
      setFavorite(false);
    } else {
      adicionaFavorito(props.video);
      setFavorite(true);
    }
  };

  useMemo(() => {
    let isFavorite = todosFavoritos.filter(
      favorito => favorito.id === props.video.id
    );
    isFavorite.length > 0 ? setFavorite(true) : setFavorite(false);
  }, [todosFavoritos, props.video]);

  return (
    <article
      className={`flex cursor-pointer flex-col bg-white items-center transform ${
        props.hover ? 'hover:scale-110' : ''
      } ease-linear duration-300 w-[93vw]
          lg:w-[15.65vw] md:max-w-[22.35vw] sm:max-w-[30.3vw]  rounded-md shadow-md`}
      onClick={enterVideo}
    >
      <div className='relative '>
        <span className=' absolute bottom-3 right-3 text-sm bg-black opacity-80 rounded-md px-1 text-white '>
          {props.video.duracao.replace('h', ':').replace('m', ':00')}
        </span>
        <video
          className='rounded-t-md object-cover aspect-video'
          title={props.video.nome}
          ref={videoRef}
          preload='none'
          poster={props.video.thumbUrl}
          muted
          onPointerLeave={pauseVideo}
          onPointerEnter={playVideo}
        >
          <source src={props.video.url} />
        </video>
        {authContext.estaAutenticado ?
          <Estrelinha favorite={favorite} favoriteVideo={favoriteVideo} />
          :
          ''
        }
      </div>

      <div className='bg-white dark:bg-raro-violeta text-black w-full rounded-b-md items-end'>
        <h2 className='truncate 2xl:text-lg xl:text-lg dark:text-gray-100 text-base mb-2 pt-4 px-2'>
          {props.video.nome}
        </h2>
      </div>
    </article>
  );
};

export default Thumbnail;
