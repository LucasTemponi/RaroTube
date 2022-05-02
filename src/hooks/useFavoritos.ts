import create from 'zustand'
import apiClient from '../services/api-client'
import { VideoProps } from '../components/VideoPlayer/VideoProps'


type favoritosProps = {
    favoritos:VideoProps[],
    favoritosCarregados:boolean,
    iniciaFavoritos: () => void,
    adicionaFavorito: (VideoId: VideoProps) => void,
    removeFavorito: (VideoId: VideoProps) => void,
}

export const useFavoritos = create<favoritosProps>((set) => ({
    favoritos: [],
    favoritosCarregados: false,
    iniciaFavoritos: async () =>{
        try{
            const response = await apiClient.get('/videos/favoritos')
            set({favoritos: response.data, favoritosCarregados: true})
        } catch(e){
            alert('Erro ao carregar os videos. Tente novamente mais tarde.')
        }        
    },
    adicionaFavorito: (Video) => { 
        try{
            apiClient.post(`/Videos/${Video.id}/favoritos`)
            set((state) => ({favoritos: [...state.favoritos, Video]}))
        } catch(e){
            window.alert('Erro ao favoritar o video. Tente novamente mais tarde.')
        }
    },
    removeFavorito: (Video) => {
        try{
            apiClient.delete(`/Videos/${Video.id}/favoritos`)
            set((state) => ({favoritos: state.favoritos.filter((f) => f.id !== Video.id)}))
        } catch(e){
            window.alert('Erro ao remover favorito. Tente novamente mais tarde.')
        }
    },
}))





