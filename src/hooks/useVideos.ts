import create from 'zustand'
import { VideoProps } from '../components/VideoPlayer/VideoProps'

type videosHookProps = {
    videos:VideoProps[],
    iniciaVideos: (todosVideos: VideoProps[]) => void,
}

export const useVideos = create<videosHookProps>((set) => ({
    videos: [],
    iniciaVideos: (todosVideos: VideoProps[]) =>{
        set({videos: todosVideos})
    }
}))