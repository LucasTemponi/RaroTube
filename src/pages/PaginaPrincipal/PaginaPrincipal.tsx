import { useEffect, useRef, useState } from "react"
import { FavoritosVazio } from "../../components/FavoritosVazio/FavoritosVazio"
import LazyThumbList from "../../components/LazyThumbList/LazyThumbList";
import { VideoList } from "../../components/VideoList/VideoList"

import { useAuthContext } from '../../context/authContext';
import { useFavoritos } from '../../hooks/useFavoritos';
import { useScroll } from '../../hooks/useScroll';
import { useVideos } from '../../hooks/useVideos';

export const PaginaPrincipal = () => {

    const videos = useVideos(state => state.videos);
    const videosCarregados = useVideos(state => state.videosCarregados);
    const iniciaVideos = useVideos(state => state.iniciaVideos);

    const iniciaFavoritos = useFavoritos(state => state.iniciaFavoritos);
    const favoritosCarregados = useFavoritos(state => state.favoritosCarregados);
    const todosFavoritos = useFavoritos(state => state.favoritos);

    const [carregando, setCarregando] = useState<boolean>(true);
    const {estaAutenticado} = useAuthContext();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const pagina = useScroll(containerRef);

    const loadVideos = async () => {
        if (estaAutenticado) {
            iniciaFavoritos();
            iniciaVideos();
        } else {
            iniciaVideos();
        }
    };

    useEffect(() => {
        console.log('useEffect estaAutenticado')
        console.log(estaAutenticado );
        if (!videosCarregados || !favoritosCarregados) {
            loadVideos();
        } else {
            setCarregando(false)
            loadVideos();
        }
    }, [estaAutenticado]);

    useEffect(() => {
        if (estaAutenticado) {
            if (videosCarregados && favoritosCarregados) {
                setCarregando(false);
            }
        } else {
            if (videosCarregados) {
                setCarregando(false);
            }
        }
    }, [videosCarregados, favoritosCarregados]);


    return (
        <section className=' mt-2 max-w-[95vw] lg:max-w-[85vw] mx-auto'>
            {estaAutenticado && (
                <article className=" mb-10 " >
                    <h1 className=' font-extrabold underline decoration-raro-rosa text-4xl my-2 py-4 text-left text-raro-cobalto'>
                        Vídeos favoritos
                    </h1>
                    {
                        carregando ?
                            <LazyThumbList items={5} />
                            :
                            todosFavoritos.length === 0 ? <FavoritosVazio /> : <VideoList hover videos={todosFavoritos} />
                    }
                </article>
            )}
            <article className=" mb-10 " >
                <h1 className=' font-extrabold underline decoration-raro-rosa text-4xl my-2 py-4 text-left text-raro-cobalto'>
                    Adicionados recentemente
                </h1>
                {
                    carregando ?
                        <LazyThumbList items={20} />
                        :
                        <VideoList hover videos={videos?.slice(0, pagina * 20)} />
                }
            </article>
            <div ref={containerRef} className='h-10' />
        </section>
    );
};
