import React, { useRef, useState } from 'react';

export const Thumbnails = () =>{
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing,setPlaying] = useState<boolean>(false)

    const onHover = () =>{
        if(videoRef.current && !playing){ 
            videoRef.current.play();
            videoRef.current.controls = true;
            setPlaying(true)
        }else if (videoRef.current && playing){
            videoRef.current?.pause();
            videoRef.current.controls = false;
            setPlaying(false);
        }
    }

    return(
        <div className = 'transform hover:scale-110 ease-linear duration-300' >
            <video title='Teste' ref={videoRef} onPointerLeave={onHover} onPointerEnter={onHover}><source src='https://file-examples.com/storage/fe31d99e526255e059c5846/2017/04/file_example_MP4_480_1_5MG.mp4'></source>  </video>
        </div>
    )
}