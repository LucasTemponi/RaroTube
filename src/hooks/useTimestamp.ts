import create from 'zustand';

type VideoTimeProps = {
  video: HTMLVideoElement | null;
  setVideo: (param: HTMLVideoElement) => void;
  setTempo: (tempo: number) => void;
};

export const useTimestamp = create<VideoTimeProps>(set => ({
  video: null,
  setVideo: param => {
    set({ video: param });
  },
  setTempo: (tempo) => set((state) => {
    if (state.video) {
      state.video.currentTime = tempo;
    }
    return { };
  })
}));
