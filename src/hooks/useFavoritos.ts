import create from 'zustand'
import axios from 'axios'

type favoritosProps = {
    favoritos:string[],
    iniciaFavoritos: (todosFavoritos: string[]) => void,
    adicionaFavorito: (videoId: string) => void,
    removeFavorito: (videoId: string) => void,
}

export const useFavoritos = create<favoritosProps>((set) => ({
    favoritos: [],
    iniciaFavoritos: (todosFavoritos: string[]) =>set({favoritos: todosFavoritos}),
    adicionaFavorito: (videoId) => { 
        axios.post(`https://3.221.159.196/videos/${videoId}/favoritos`)
        set((state) => ({favoritos: [...state.favoritos, videoId]})
    )},
    removeFavorito: (videoId) => {
        axios.delete(`https://3.221.159.196/video/${videoId}/favoritos`)
        set((state) => ({favoritos: state.favoritos.filter((f) => f !== videoId)})
    )},
}))