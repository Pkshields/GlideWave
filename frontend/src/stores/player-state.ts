import { create } from "zustand"
import { StreamSource } from "../types/stream-source"

interface PlayerSourceState {
    source: StreamSource
    setPlayerSource: (source: StreamSource) => void
}
export const usePlayerSourceStore = create<PlayerSourceState>((set) => ({
    source: {
        name: "SELECT A SOURCE",
        streamer: "PLEASE",
        sourceHomepage: "https://paulshields.dev",
        streamUrl: "rtsp://localhost:8080"
    },
    setPlayerSource: (source: StreamSource) => set(() => ({ source }))
}))

interface PlayerIsPlayingState {
    isPlaying: boolean
    toggleIsPlaying: () => void
}

export const usePlayerIsPlayingStore = create<PlayerIsPlayingState>((set) => ({
    isPlaying: false,
    toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying }))
}))
