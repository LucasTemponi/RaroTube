import React, { useEffect, useRef, useState } from 'react';
import { useFavoritos } from '../../hooks/useFavoritos';
import { thumbnailProps } from './ThumbnailProps';

export const Thumbnails:React.FC<thumbnailProps> = (video) =>{
    const videoRef = useRef<HTMLVideoElement>(null);
    const [favorite,setFavorite]= useState(false);
    const todosFavoritos = useFavoritos(state=>state.favoritos);
    const adicionaFavorito = useFavoritos(state=>state.adicionaFavorito);
    const removeFavorito = useFavoritos(state=>state.removeFavorito);
    let debounceId = useRef(0);

    const playVideo = () =>{
        debounceId.current = window.setTimeout(()=>{
            if(videoRef.current){ 
                videoRef.current.play();
                videoRef.current.controls = false;
            }
        },340);
    }

    const pauseVideo = () =>{
        clearTimeout(debounceId.current);
        if (videoRef.current){
            videoRef.current?.pause();
            videoRef.current.controls = false;
        }    
    }

    const favoriteVideo = () =>{
        if(favorite){
            removeFavorito(video.id);
            setFavorite(false);
            console.log(todosFavoritos)
        }else{
            adicionaFavorito(video.id);
            setFavorite(true);
            console.log(todosFavoritos)
        }
    }

    useEffect(()=>{
        let isFavorite = todosFavoritos.includes(video.id);
        setFavorite(isFavorite);
    },[]);

    return(
        <div className={`transform ${video.hover ? 'hover:scale-110' : ''} ease-linear duration-300
            2xl:w-[15vw] xl:w-[19vw] lg:w-[20vw] md:w-[28vw] sm:w-[45vw] mt-4 ml-4 rounded-md `}>
            <video className = 'w-full h-full rounded-xl '
                title={video.nome}
                ref={videoRef}
                preload='metadata'
                muted
                onPointerLeave={pauseVideo}
                onPointerEnter={playVideo}>
                    <source src={video.url}/>                 
            </video>
            <svg xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${favorite ? 'fill-amber-300' : 'fill-gray-100 hover:fill-amber-100'} absolute top-3 right-3`}
                fill="none"
                viewBox="0 0 24 24"
                onClick={favoriteVideo}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        </div>
    )
}

export default Thumbnails;