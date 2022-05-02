import create from 'zustand'
import { VideoProps } from '../components/VideoPlayer/VideoProps'
import apiClient from '../services/api-client'

type videosHookProps = {
    videos:VideoProps[],
    topicos:semanasProps,
    videosCarregados:boolean,
    iniciaVideos: () => void,
}

type semanasProps = {
    [key: string]: VideoProps[]
}

export const useVideos = create<videosHookProps>((set,get) => ({
    
    videos: [],
    topicos: {},
    videosCarregados: false,
    iniciaVideos: async () =>{

        const separaTopicos = ( todosVideos:VideoProps[] ) => {

            const semanas: semanasProps = {}
            todosVideos.forEach( video => {
                // if (video.topico !== 'aulão') {
                    semanas[video.topico] ? semanas[video.topico].push(video) : semanas[video.topico] = [video]
                // }
            })
            return semanas
        }

        try{
            const response = await apiClient.get('/videos?pagina=1&itensPorPagina=100&orderBy=createdAt&orderDirection=DESC')
            const videosState = get().videos
            if (videosState.length !== response.data){
                set({videos: response.data, videosCarregados: true})
                set({topicos: separaTopicos(response.data)})
            }
            
        } catch(e){
            alert('Erro ao carregar os videos. Tente novamente mais tarde.')
        }
    }
}))