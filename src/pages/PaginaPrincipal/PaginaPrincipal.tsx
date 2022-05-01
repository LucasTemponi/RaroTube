import { useEffect, useRef, useState } from "react"
import { FavoritosVazio } from "../../components/FavoritosVazio/FavoritosVazio"
import { VideoList } from "../../components/VideoList/VideoList"
import { VideoProps } from "../../components/VideoPlayer/VideoProps"

import { useAuthContext } from '../../context/authContext';
import { useFavoritos } from '../../hooks/useFavoritos';
import { useScroll } from '../../hooks/useScroll';
import { useVideos } from '../../hooks/useVideos';

import { LazyPrincipal } from './LazyPagina';

export const PaginaPrincipal = () => {

    const videos = useVideos(state => state.videos);
    const videosCarregados = useVideos(state => state.videosCarregados);
    const iniciaVideos = useVideos(state => state.iniciaVideos);

    const iniciaFavoritos = useFavoritos(state => state.iniciaFavoritos);
    const favoritosCarregados = useFavoritos(state => state.favoritosCarregados);
    const todosFavoritos = useFavoritos(state => state.favoritos);

    const [carregando, setCarregando] = useState<boolean>(true);
    const authContext = useAuthContext();


    const containerRef = useRef<HTMLDivElement | null>(null);
    const pagina = useScroll(containerRef);

    const loadVideos = async () => {
        if (authContext.estaAutenticado) {
            iniciaFavoritos();
            iniciaVideos();
        } else {
            iniciaVideos();
        }
    };

    useEffect(() => {
            if ( !videosCarregados || !favoritosCarregados) {
                loadVideos();
            } else {
                setCarregando(false)
                loadVideos();
            }
    }, [authContext.estaAutenticado]);
    
    useEffect(() => {
        if (authContext.estaAutenticado) {
            if (videosCarregados && favoritosCarregados ) {
                setCarregando(false);
            }
        } else {
            if (videosCarregados) {
                setCarregando(false);
            }
        }
    },[videosCarregados,favoritosCarregados]);


    return (
        carregando ? (
            <LazyPrincipal />
        ) : (
        <>
            <div className=' my-auto max-w-[95vw] lg:max-w-[85vw] mx-auto'>
                {authContext.estaAutenticado && (
                    <>
                        <h1 className=' font-extrabold underline decoration-raro-rosa text-2xl ml-7 py-4 text-left text-raro-cobalto'>
                            Vídeos favoritos
                        </h1>
                        <VideoList hover videos={todosFavoritos} />
                    </>
                )}
                <h1 className=' font-extrabold underline decoration-raro-rosa text-2xl  ml-7 py-4 text-left text-raro-cobalto'>
                    Adicionados recentemente
                </h1>
                <VideoList hover videos={videos?.slice(0, pagina * 10)} />

                <div ref={containerRef} className='h-10' />
            </div>
        </>
    ));    
};
