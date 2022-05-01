import create from 'zustand'
import { VideoProps } from '../components/VideoPlayer/VideoProps'
import apiClient from '../services/api-client'

type videosHookProps = {
    videos:VideoProps[],
    videosCarregados:boolean,
    iniciaVideos: () => void,
}

export const useVideos = create<videosHookProps>((set) => ({
    videos: [],
    videosCarregados: false,
    iniciaVideos: async () =>{
        try{
            const response = await apiClient.get('/videos?pagina=1&itensPorPagina=100&orderBy=dataPublicacao&orderDirection=DESC')
            set({videos: response.data, videosCarregados: true})
        } catch(e){
            alert('Erro ao carregar os videos. Tente novamente mais tarde.')
        }
    }
}))