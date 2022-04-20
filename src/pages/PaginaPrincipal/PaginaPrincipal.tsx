import { useEffect, useMemo, useState } from "react"
import Navbar from "../../components/Navbar"
import { VideoList } from "../../components/VideoList/VideoList"
import axios from 'axios'
import { videoProps } from "../../components/VideoPlayer/VideoProps"
import { useFavoritos } from "../../hooks/useFavoritos"

export const PaginaPrincipal = () => {

    const [ videos, setVideos ] = useState<videoProps[]>();
    const [ recomendados, setRecomendados ] = useState<videoProps[]>();
    const [ carregando, setCarregando ] = useState<boolean>(true);
    const [ logado, setLogado ] = useState<boolean>(true);

    const iniciaFavoritos = useFavoritos(state=>state.iniciaFavoritos);
    const todosFavoritos = useFavoritos(state=>state.favoritos);

    const loadVideos = async () =>{
        await Promise.all([
            axios.get('https://3.221.159.196:3320/videos').then(response => setVideos(response.data)),
            axios.get('https://3.221.159.196:3320/videos/favoritos').then(response => iniciaFavoritos(response.data)),
            //axios.get('https://3.221.159.196:3320/videos/')
            ])
        console.log(videos)
    }

    const videosFavoritos = useMemo(()=>{
        let temp:videoProps[] = [];
        todosFavoritos.map(idFavorito=>{
            if (videos){
                let isVideoFavorite = videos.find(element=>element.id===idFavorito);
                if (isVideoFavorite){
                    temp.push(isVideoFavorite);
                }
            }
        })
        return temp;
    },[todosFavoritos])

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
                        <VideoList videos={videosFavoritos} />
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