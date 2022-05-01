import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Thumbnail from "../Thumbnail/Thumbnail"
import { VideoProps } from "../VideoPlayer/VideoProps"

export const NextUp: React.FC<VideoProps> = (video) => {
    const [timer, setTimer] = useState<number>(0);
    const [timerCancelado,setTimerCancelado] = useState<boolean>(false);
    const setTimeoutId = useRef(0);
    const navigate = useNavigate();

    const handleTimer = () => {
        console.log(timer);
        if (timer < 5) {
            setTimeoutId.current = window.setTimeout(() => {
                setTimer(timer + 0.01667);
            }, 16.667);
        } else {
            navigate(`/video/${video.id}/`);
        }
    }

    const cancelaTimer = () => {
        clearTimeout(setTimeoutId.current);
        setTimer(0);
        setTimerCancelado(true);
    }

    useEffect(() => {
        if (timer <= 5) {
            handleTimer();
        }
    }, []);

    useEffect(() => {
        if (!timerCancelado) {
            handleTimer();
        }
    }, [timer,timerCancelado]);

    return (
        <div className=' flex flex-col justify-center items-center w-full h-full absolute bg-gray-800 bg-opacity-80 ' >
            <div className=" z-10 items-center mx-auto " >
                <Thumbnail hover video={video} />
            </div>
            { timerCancelado ? <div className=" relative w-36 h-10 mt-4" ></div> : 
                <div className=' relative w-36 h-10 mt-4 bg-slate-50 rounded-md ' >
                    <div className=' absolute h-full rounded-md bg-raro-oceano ' style={{ width: `${timer * 20}%` }}></div>
                    <button 
                        className=' bg-transparent absolute top-0 z-10 h-full w-full
                            rounded-md text-sm text-red-700 border border-raro-oceano
                            text-center '
                        onClick={cancelaTimer}>
                        Cancelar
                    </button>
                </div>}
        </div>
    )
}