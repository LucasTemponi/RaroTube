import React, { useRef } from 'react';
import { thumbnailProps } from './ThumbnailProps';

export const Thumbnails:React.FC<thumbnailProps> = (video) =>{
    const videoRef = useRef<HTMLVideoElement>(null);

    const playVideo = () =>{
        if(videoRef.current){ 
            videoRef.current.play();
            videoRef.current.controls = true;
            console.log(`${video.nome} is playing`)
        }
    }

    const pauseVideo = () =>{
        if (videoRef.current){
            videoRef.current?.pause();
            videoRef.current.controls = false;
            console.log(`${video.nome} is paused`)
        }    
    }

    return(
        <div>
            <video className = 'transform hover:scale-110 ease-linear duration-300 w-4/5 m-0'
             title={video.nome}
             ref={videoRef}
             muted
             onPointerLeave={pauseVideo}
             onPointerEnter={playVideo}>
                 <source src={video.url}/>
            </video>
        </div>
    )
}