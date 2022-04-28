import create from 'zustand'
import apiClient from '../services/api-client'
import { VideoProps } from '../components/VideoPlayer/VideoProps'


type favoritosProps = {
    favoritos:VideoProps[],
    iniciaFavoritos: (todosFavoritos: VideoProps[]) => void,
    adicionaFavorito: (VideoId: VideoProps) => void,
    removeFavorito: (VideoId: VideoProps) => void,
}

export const useFavoritos = create<favoritosProps>((set) => ({
    favoritos: [],
    iniciaFavoritos: (todosFavoritos: VideoProps[]) =>{
        set({favoritos: todosFavoritos})
    },
    adicionaFavorito: (Video) => { 
        apiClient.post(`/Videos/${Video.id}/favoritos`)
        set((state) => ({favoritos: [...state.favoritos, Video]})
    )},
    removeFavorito: (Video) => {
        apiClient.delete(`/Videos/${Video.id}/favoritos`)
        set((state) => ({favoritos: state.favoritos.filter((f) => f.id !== Video.id)})
    )},
}))