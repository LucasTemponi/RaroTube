import create from 'zustand'
import apiClient from '../services/api-client'
import { videoProps } from '../components/VideoPlayer/VideoProps'


type favoritosProps = {
    favoritos:videoProps[],
    iniciaFavoritos: (todosFavoritos: videoProps[]) => void,
    adicionaFavorito: (videoId: videoProps) => void,
    removeFavorito: (videoId: videoProps) => void,
}

export const useFavoritos = create<favoritosProps>((set) => ({
    favoritos: [],
    iniciaFavoritos: (todosFavoritos: videoProps[]) =>{
        set({favoritos: todosFavoritos})
    },
    adicionaFavorito: (video) => { 
        apiClient.post(`/videos/${video.id}/favoritos`)
        set((state) => ({favoritos: [...state.favoritos, video]})
    )},
    removeFavorito: (video) => {
        apiClient.delete(`/videos/${video.id}/favoritos`)
        set((state) => ({favoritos: state.favoritos.filter((f) => f.id !== video.id)})
    )},
}))