import { useEffect, useRef, useState } from 'react';
import { BuscaTimestamps } from '../../helpers/BuscaTimestamps';
import { VideoPlayerProps } from './VideoPlayerProps';
import { NextUp } from '../NextUp/NextUP';
import { useFavoritos } from '../../hooks/useFavoritos';


export const VideoPlayer: React.FC<VideoPlayerProps> = props => {

  const [favorite, setFavorite] = useState(false);
  const [videoAcabando, setVideoAcabando] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const todosFavoritos = useFavoritos(state => state.favoritos);
  const favoritosCarregados = useFavoritos(state => state.favoritosCarregados);
  const removeFavorito = useFavoritos(state => state.removeFavorito);
  const adicionaFavorito = useFavoritos(state => state.adicionaFavorito);
  

  const favoriteVideo = () => {
    if (favorite) {
      removeFavorito(props.video);
    } else {
      adicionaFavorito(props.video);
    }
  };

  const handleOnTimeUpdate = () => {
    if (videoRef.current) {
      if (videoRef.current?.currentTime >= (videoRef.current.duration - 2)) {
        setVideoAcabando(true);
      } else {
        setVideoAcabando(false);
      }
    }
  }

  useEffect(() => {
    let isFavorite = todosFavoritos.filter(
      favorito => favorito.id === props.video.id);
    isFavorite.length > 0 ? setFavorite(true) : setFavorite(false);
  }, [todosFavoritos]);

  return (
    <>
      <div className="w-full h-full relative ">
      {videoAcabando && <NextUp {...props.proximoVideo} />}
      <video ref={videoRef} id="VideoPrincipal" className='w-full max-h-[80vh]' title={props.video.nome} controls onTimeUpdate={handleOnTimeUpdate}>
        <source src={props.video.url} />
      </video>
      </div>
      <div className='w-14/12 mx-8 mt-8'>
        <div className='flex flex-row justify-items-start mt-2 mb-4'>
          <h1 className='w-2/3'>{props.video.nome}</h1>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-6 w-6  ${favorite ? 'fill-amber-300' : 'fill-gray-100 hover:fill-amber-100'
              } content-center`}
            fill='none'
            viewBox='0 0 24 24'
            onClick={favoriteVideo}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
            />
          </svg>
        </div>
        <hr className='border-raro-rosa' />
        <div className='mt-6'>
          <p>{BuscaTimestamps(props.video.descricao)}</p>
        </div>
      </div>
    </>
  );
};