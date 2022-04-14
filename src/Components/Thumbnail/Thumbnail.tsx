import React, { useRef, useState } from 'react';
import { thumbnailProps } from './ThumbnailProps';

export const Thumbnails:React.FC<thumbnailProps> = (video) =>{
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing,setPlaying] = useState<boolean>(false)

    const onHover = () =>{
        if(videoRef.current && !playing){ 
            videoRef.current.play();
            videoRef.current.controls = true;
            setPlaying(true)
            console.log(`${video.nome} is playing`)
        }else if (videoRef.current && playing){
            videoRef.current?.pause();
            videoRef.current.controls = false;
            setPlaying(false);
            console.log(`${video.nome} is paused`)
        }
    }

    return(
        <div>
            <video className = 'transform hover:scale-110 ease-linear duration-300 w-4/5'
             title={video.nome}
             ref={videoRef}
             onPointerLeave={onHover}
             onPointerEnter={onHover}>
                 <source src={video.url}/>
            </video>
        </div>
    )
}