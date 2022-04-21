import { useEffect, useMemo, useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import { VideoList } from "../../components/VideoList/VideoList"
import { videoProps } from "../../components/VideoPlayer/VideoProps"
import { useFavoritos } from "../../hooks/useFavoritos"
import apiClient from "../../services/api-client";

export const PaginaPrincipal = () => {

    const [ videos, setVideos ] = useState<videoProps[]>();
    const [ recomendados, setRecomendados ] = useState<videoProps[]>();
    const [ carregando, setCarregando ] = useState<boolean>(true);
    const [ logado, setLogado ] = useState<boolean>(true);

    const iniciaFavoritos = useFavoritos(state=>state.iniciaFavoritos);
    const todosFavoritos = useFavoritos(state=>state.favoritos);

    const loadVideos = async () =>{
        await Promise.all([
            apiClient.get('/videos').then(response => setVideos(response.data)),
            apiClient.get('/videos/favoritos').then(response => iniciaFavoritos(response.data)),
            //axiosapiInstance.get('https://3.221.159.196:3320/videos/')
            ])
    }

    // const videosFavoritos = useMemo(()=>{
    //     let temp:videoProps[] = [];
    //     todosFavoritos.forEach(idFavorito=>{
    //         if (videos){
    //             let isVideoFavorite = videos.find(element=>element.id===idFavorito);
    //             if (isVideoFavorite){
    //                 temp.push(isVideoFavorite);
    //             }
    //         }
    //     })
    //     console.log(todosFavoritos)
    //     return temp;
    // },[todosFavoritos])

    useEffect(()=>{
        loadVideos()
        setCarregando(false)
    },[])

    return(
        <>
            <Navbar />
            {carregando ? <div>Carregando...</div> :
            <div className="4xl:max-w-[70vw] xl:max-w-[80vw] lg:w-[85vw] 
                md:w-[90vw] sm:w-[95vw] m-auto" >
                {logado ? 
                    <>
                        <h1 className=" font-extrabold underline decoration-raro-rosa text-4xl m-4 mt-12 text-left " >Vídeos favoritos</h1>
                        <VideoList videos={todosFavoritos} />
                    </> :
                    ''
                }
                <h1 className=" font-extrabold underline decoration-raro-oceano text-4xl m-4 mt-12 text-left">Adicionados recentemente</h1>
                <VideoList videos={videos} />
                <h1 className=" font-extrabold underline decoration-raro-violeta text-4xl m-4 mt-12 text-left">Recomendados</h1>
            </div>}
        </>
    )
}