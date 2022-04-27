import { lazy,useEffect, useRef, useState, Suspense } from "react"
import { LazyThumbList } from "../../components/LazyThumbList/LazyThumbList"
import { VideoList } from "../../components/VideoList/VideoList"
import { videoProps } from "../../components/VideoPlayer/VideoProps"
import { useAuthContext } from "../../context/authContext"
import { useFavoritos } from "../../hooks/useFavoritos"
import { useScroll } from "../../hooks/useScroll"

import apiClient from "../../services/api-client";
import { LazyPrincipal } from "./LazyPagina"

export const PaginaPrincipal = () => {

    // const VideoList = lazy(()=>import('../../components/VideoList/VideoList'));

    const [videos, setVideos] = useState<videoProps[]>();
    const [recomendados, setRecomendados] = useState<videoProps[]>();
    const [carregando, setCarregando] = useState<boolean>(true);
    const authContext = useAuthContext();

    const iniciaFavoritos = useFavoritos(state => state.iniciaFavoritos);
    const todosFavoritos = useFavoritos(state => state.favoritos);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const pagina = useScroll(containerRef)

    const loadVideos = async () => {
        await Promise.all([
            apiClient.get('/videos').then(response => setVideos(response.data.reverse())),
            apiClient.get('/videos/favoritos').then(response => iniciaFavoritos(response.data)),
            apiClient.get(`/videos/${authContext.id}/recomendacoes?itensPorPagina=100`).then(response => setRecomendados(response.data))
        ])
    }

    useEffect(() => {
        loadVideos()
        setTimeout(()=>setCarregando(false),2000)
    }, [])

    return (
        carregando ? <LazyPrincipal /> :
        <>
            <div className="4xl:max-w-[70vw] xl:max-w-[80vw] lg:w-[85vw] md:w-[90vw] sm:w-[95vw] m-auto" >
            </div>
                {
                    authContext.estaAutenticado() &&
                    (<>
                        <h1 className=" font-extrabold underline decoration-raro-rosa text-4xl m-4 mt-12 text-left " >Vídeos favoritos</h1>
                            <VideoList videos={todosFavoritos} />
                        
                    </>)
                }
                <h1 className=" font-extrabold underline decoration-raro-oceano text-4xl m-4 mt-12 text-left">Adicionados recentemente</h1>
                    <VideoList videos={videos?.slice(0, 10)} />
                <h1 className=" font-extrabold underline decoration-raro-violeta text-4xl m-4 mt-12 text-left">Recomendados</h1>
                    <VideoList videos={recomendados?.slice(0, pagina * 15)} />

                <div ref={containerRef} className="h-10" /> 
        </>
    )
}