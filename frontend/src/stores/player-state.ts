import { create } from "zustand"

interface PlayerUrlState {
    url: string
    setUrl: (url: string) => void
}

interface PlayerIsPlayingState {
    isPlaying: boolean
    toggleIsPlaying: () => void
}

export const usePlayerUrlStore = create<PlayerUrlState>((set) => ({
    // url: "https://relay.rainwave.cc:443/game.ogg",
    url: "https://www.youtube.com/watch?v=7NOSDKb0HlU",
    setUrl: (url: string) => set(() => ({ url }))
}))

export const usePlayerIsPlayingStore = create<PlayerIsPlayingState>((set) => ({
    isPlaying: false,
    toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying }))
}))
